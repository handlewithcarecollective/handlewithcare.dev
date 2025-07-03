import { Link } from "@/components/blog/Link";
import { BlogSection } from "@/components/blog/Section";
import { getPosts } from "@/posts/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Attributes, Children, cloneElement, isValidElement } from "react";
import { Post } from "./Post";
import { openGraph } from "@/app/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPosts().find((post) => post.slug === slug);
  if (!post) notFound();

  return <Post post={post} />;
}

export async function generateStaticParams() {
  return getPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts().find((post) => post.slug === slug);
  if (!post) notFound();

  return {
    title: post.title,
    description: post.snippet,
    ...(post.canonical && { alternates: { canonical: post.canonical } }),
    openGraph: {
      ...openGraph,
      title: post.title,
      description: post.snippet,
      siteName: openGraph.title,
    },
  };
}
