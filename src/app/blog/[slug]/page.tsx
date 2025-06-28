import { posts } from "@/posts/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((post) => post.slug === slug);
  if (!post) notFound();

  return (
    <main className="mx-auto mt-20 flex max-w-prose flex-col gap-4">
      <p>{post.date}</p>
      <h3 className="font-headings text-center text-2xl leading-[0.9] font-extralight uppercase md:text-4xl">
        {post.title}
      </h3>
      <p className="text-base font-bold md:text-xl">by {post.author}</p>
      {post.canonical && (
        <p>
          Originally published to{" "}
          <Link className="font-bold underline" href={post.canonical}>
            {new URL(post.canonical).hostname}
          </Link>
        </p>
      )}
      {post.sections.map((section) => (
        <section
          className="flex flex-col gap-4 text-base md:text-xl"
          id={section.title}
        >
          {section.children}
        </section>
      ))}
    </main>
  );
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
