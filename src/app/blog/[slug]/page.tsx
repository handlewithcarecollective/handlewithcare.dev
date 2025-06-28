import { Link } from "@/components/blog/Link";
import { BlogSection } from "@/components/blog/Section";
import { posts } from "@/posts/posts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
  serverOnly?: boolean;
}

export default async function PostPage({ params, serverOnly }: Props) {
  const { slug } = await params;
  const post = posts.find((post) => post.slug === slug);
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
            {section.children}
          </BlogSection>
        ))
      ) : (
        <post.Component serverOnly={serverOnly} />
      )}
    </main>
  );
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
