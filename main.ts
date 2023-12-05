import "https://deno.land/std@0.208.0/dotenv/load.ts";

import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { Status } from "https://deno.land/std@0.200.0/http/http_status.ts";

function ensureEnv(varName: string): string {
  const value = Deno.env.get(varName);
  if (value === undefined) {
    throw new Error(`Missing required environment variable ${varName}`);
  }

  return value;
}

const smtpHost = ensureEnv("SMTP_HOST");
const smtpPort = ensureEnv("SMTP_PORT");
const smtpUsername = ensureEnv("SMTP_USERNAME");
const smtpPassword = ensureEnv("SMTP_PASSWORD");

const smtpAuth = ensureEnv("SMTP_AUTH");
if (!["tls", "starttls", "none"].includes(smtpAuth)) {
  throw new Error(
    `SMTP_AUTH must be set to one of "tls", "starttls", or "none". Received "${smtpAuth}".`,
  );
}

const contactSender = ensureEnv("CONTACT_SENDER");
const contactRecipientsString = ensureEnv("CONTACT_RECIPIENTS");
const contactRecipients = contactRecipientsString.split(",");

const turnstileSecret = ensureEnv("TURNSTILE_SECRET");

const client = new SMTPClient({
  ...(smtpAuth === "none" && {
    debug: { allowUnsecure: true, noStartTLS: true },
  }),
  connection: {
    hostname: smtpHost,
    port: parseInt(smtpPort, 10),
    auth: {
      username: smtpUsername,
      password: smtpPassword,
    },
    tls: false,
  },
});

const router = new Router();

router.post("/contact", async (context) => {
  const params = await context.request.body({
    type: "form",
  })
    .value;

  const token = params.get("cf-turnstile-response");

  if (!token) {
    context.response.status = Status.Forbidden;
    context.response.body = "Missing turnstile token";
    return;
  }

  const ip = context.request.headers.get("CF-Connecting-IP");

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const response = await fetch(url, {
    body: JSON.stringify({
      secret: turnstileSecret,
      response: token,
      remoteip: ip,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = await response.json();

  if (!result.success) {
    context.response.status = Status.Forbidden;
    context.response.body = "Failed turnstile verification";
    return;
  }

  const name = params.get("name");
  const email = params.get("email");
  const companyName = params.get("company-name");
  const message = params.get("message");

  if (!name || !email || !companyName || !message) {
    context.response.status = Status.BadRequest;
    return;
  }

  const plainTextContent = `
From: ${name} - ${email}

Company: ${companyName}

Message:

${message}
`;

  const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="https://www.w3.org/1999/xhtml">
  <head>
    <title>Handle with Care - new message!</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <p>From: ${name} - ${email}</p>
    <p>Company: ${companyName}</p>
    <p>Message:</p>
    <p>${message}</p>
  </body>
</html>
`;

  console.log("Received contact submission");

  await client.send({
    from: contactSender,
    to: contactRecipients,
    replyTo: params.get("email")!,
    subject: "Handle with Care - new message!",
    content: plainTextContent,
    html: htmlContent,
  });

  context.response.redirect("/");
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

await app.listen({ port: 8000 });
