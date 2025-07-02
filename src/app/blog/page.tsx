import { PostSnippet } from "@/components/blog/PostSnippet";
import { getPosts } from "@/posts/posts";
import { Metadata } from "next";

export default async function BlogHomePage() {
  return (
    <main className="">
      <h2 className="font-headings mt-28 text-center text-2xl leading-[0.9] font-extralight uppercase md:text-4xl">
        Our writing
      </h2>
      <section className="mt-48 flex flex-col gap-10">
        {getPosts({ serverOnly: false }).map((post) => (
          <PostSnippet
            key={post.slug}
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

export const metadata: Metadata = {
  title: "Handle with Care Collective — Writing",
  description: "Writings from worker-owned product development cooperative.",
  alternates: {
    types: {
      "application/atom+xml": [
        {
          url: "https://handlewithcare.dev/blog/recent.atom",
          title: "Handle with Care Collective — Writing",
        },
      ],
    },
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    url: "https://handlewithcare.dev/blog",
  },
};
