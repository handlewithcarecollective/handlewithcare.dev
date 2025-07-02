import { Link } from "@/components/blog/Link";
import { BlogSection } from "@/components/blog/Section";
import { getPosts } from "@/posts/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Attributes, Children, cloneElement, isValidElement } from "react";

interface Props {
  params: Promise<{ slug: string }>;
  serverOnly?: boolean;
}

export default async function PostPage({ params, serverOnly }: Props) {
  const { slug } = await params;
  const post = getPosts({ serverOnly }).find((post) => post.slug === slug);
  if (!post) notFound();

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

export async function generateStaticParams() {
  return getPosts({ serverOnly: true }).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts({ serverOnly: true }).find(
    (post) => post.slug === slug,
  );
  if (!post) notFound();

  return {
    title: post.title,
    description: post.snippet,
    ...(post.canonical && { alternates: { canonical: post.canonical } }),
  };
}
