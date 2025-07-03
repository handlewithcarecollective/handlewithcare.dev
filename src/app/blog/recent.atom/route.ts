import { getPosts } from "@/posts/posts";
import escapeHTML from "escape-html";
import { NextResponse } from "next/server";
import { ReadableStream } from "node:stream/web";
import { createElement, ReactNode } from "react";
import type {
  ReactDOMServerReadableStream,
  RenderToReadableStreamOptions,
} from "react-dom/server";
import { Post } from "../[slug]/Post";

export const dynamic = "force-static";

export async function GET() {
  // This has to be dynamically imported to work around this:
  // https://github.com/vercel/next.js/issues/43810
  const renderToReadableStream: (
    node: ReactNode,
    options?: RenderToReadableStreamOptions,
  ) => Promise<ReactDOMServerReadableStream> = (
    await import("react-dom/server.browser")
  ).renderToReadableStream;

  const postEntries = [];
  for (const post of getPosts({ serverOnly: true })) {
    const markupBytesStream = await renderToReadableStream(
      createElement(Post, {
        post,
        serverOnly: true,
      }),
    );

    await markupBytesStream.allReady;

    const markupStream = markupBytesStream.pipeThrough(new TextDecoderStream());

    let markup = "";
    for await (const chunk of markupStream as ReadableStream<string>) {
      markup += chunk;
    }
    const path = `/blog/${post.slug}/`;
    const published = new Date(post.date).toISOString();
    const updated =
      (post.updated && new Date(post.updated).toISOString()) ?? published;

    postEntries.push({
      title: post.title,
      updated,
      published,
      path,
      author: post.author,
      summary: post.snippet,
      content: escapeHTML(""),
      // content: escapeHTML(markup),
    });
  }

  postEntries.sort(
    (a, b) => new Date(a.published).valueOf() - new Date(b.published).valueOf(),
  );

  const latestUpdated = postEntries.reduce((a, b) => {
    if (new Date(a.updated).valueOf() > new Date(b.updated).valueOf()) {
      return a;
    }
    return b;
  });

  const response = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title type="text">Handle with Care Blog - Recent Posts</title>
  <author>
    <name>Handle with Care Collective</name>
    <uri>https://handlewithcare.dev</uri>
  </author>
  <icon>https://handlewithcare.dev/favicon.ico</icon>
  <id>https://handlewithcare.dev/blog/recent.atom</id>
  <updated>${latestUpdated.updated}</updated>
  <link href="https://handlewithcare.dev/" />
  <link href="https://handlewithcare.dev/blog/recent.atom" rel="self" />
${postEntries
  .map(
    (post) => `  <entry>
    <title type="text">${post.title}</title>
    <id>https://handlewithcare.dev${post.path}</id>
    <updated>${post.updated}</updated>
    <published>${post.published}</published>
    <link href="https://handlewithcare.dev${post.path}" />
    <author>
      <name>${post.author}</name>
      <uri>https://handlewithcare.dev/#${post.author}</uri>
    </author>
    <summary type="text">${post.summary}</summary>
    <content type="html" xml:lang="en" xml:base="http://handlewithcare.dev${post.path}">
      ${post.content}
    </content>
  </entry>
`,
  )
  .join("\n")}
</feed>
`;

  return new NextResponse(response, {
    headers: {
      "Content-Type": "application/atom+xml",
    },
  });
}
