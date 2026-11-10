import Link from "next/link";

interface Props {
  href: string;
  segment: string;
  title: string;
  client: string;
  summary: string;
}

export function CaseStudySnippet({
  href,
  segment,
  title,
  client,
  summary,
}: Props) {
  return (
    <Link className="group" href={href}>
      <article className="flex flex-col gap-3 px-10">
        <header className="flex flex-col gap-3">
          <p>{segment}</p>
          <h3 className="group-hover:decoration-green font-headings text-xl font-extralight uppercase group-hover:underline group-hover:underline-offset-8 md:text-3xl">
            {title}
          </h3>
          <p className="text-base font-bold md:text-xl">{client}</p>
        </header>
        <p className="text-base md:text-xl">{summary}</p>
      </article>
    </Link>
  );
}