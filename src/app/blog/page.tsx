import { PostSnippet } from "@/components/blog/PostSnippet";
import { posts } from "@/posts/posts";
import Link from "next/link";

export default async function BlogHomePage() {
  return (
    <main className="">
      <h2 className="font-headings mt-28 text-center text-2xl leading-[0.9] font-extralight uppercase md:text-4xl">
        Our writing
      </h2>
      <section className="mt-48">
        {posts.map((post) => (
          <PostSnippet
            slug={post.slug}
            title={post.title}
            author={post.author}
            date={post.date}
            snippet={post.snippet}
          />
        ))}
      </section>
    </main>
  );
}
