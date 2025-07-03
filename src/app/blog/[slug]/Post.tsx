import { Link } from "@/components/blog/Link";
import { BlogSection } from "@/components/blog/Section";
import { getPosts } from "@/posts/posts";
import { Children, isValidElement, cloneElement, Attributes } from "react";

export function Post({
  post,
  serverOnly,
}: {
  post: ReturnType<typeof getPosts>[number];
  serverOnly?: boolean;
}) {
  return (
    <main className="mx-auto mt-20 flex max-w-prose flex-col gap-4">
      <header className="flex flex-col gap-8">
        <Link href="/blog">Back to all writing</Link>
        <p>{post.date}</p>
        <h2 className="font-headings text-center text-2xl leading-[1] font-extralight uppercase md:text-4xl">
          {post.title}
        </h2>
        <p className="text-base font-bold md:text-xl">by {post.author}</p>
        {post.canonical && (
          <p>
            Originally published to{" "}
            <Link href={post.canonical}>
              {new URL(post.canonical).hostname}
            </Link>
          </p>
        )}
      </header>
      {"sections" in post ? (
        post.sections.map((section) => (
          <BlogSection key={section.title} id={section.title}>
            {Children.map(section.children, (child) =>
              isValidElement(child)
                ? cloneElement(child, { serverOnly } as unknown as Attributes)
                : child,
            )}
          </BlogSection>
        ))
      ) : (
        <post.Component serverOnly={serverOnly} />
      )}
    </main>
  );
}
