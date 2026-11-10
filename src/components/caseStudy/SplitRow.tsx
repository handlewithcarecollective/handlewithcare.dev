import { ReactNode } from "react";
import { Rule } from "../home/Rule";
import { HomeSectionArticle } from "../home/SectionArticle";

interface Props {
  left: ReactNode;
  right: ReactNode;
}

export function SplitRow({ left, right }: Props) {
  return (
    <HomeSectionArticle className="md:border-x-blueprint mb-4 flex min-h-0 flex-col gap-4 border-none p-0 md:mb-8 md:min-h-0 md:flex-row md:gap-8 md:px-7 md:py-0.5 md:pb-0">
      <div className="px-4 pb-4 md:basis-1/2 md:pb-8">{left}</div>
      <Rule vertical />
      <div className="px-4 pb-4 md:basis-1/2 md:pb-8">{right}</div>
    </HomeSectionArticle>
  );
}