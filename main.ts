import "https://deno.land/std@0.208.0/dotenv/load.ts";

import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const router = new Router();

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
