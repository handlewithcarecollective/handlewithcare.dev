import Link from "next/link";

interface Props {
  title: string;
  date: string;
  author: string;
  snippet: string;
  slug: string;
}

export function PostSnippet({ title, date, author, snippet, slug }: Props) {
  return (
    <Link className="group" href={`/blog/${slug}`}>
      <article className="flex flex-col gap-3 px-10">
        <header className="flex flex-col gap-3">
          <p>{date}</p>
          <h3 className="group-hover:decoration-green font-headings text-xl font-extralight uppercase group-hover:underline group-hover:underline-offset-8 md:text-3xl">
            {title}
          </h3>
          <p className="text-base font-bold md:text-xl">by {author}</p>
        </header>
        <p className="text-base md:text-xl">{snippet}</p>
      </article>
    </Link>
  );
}
