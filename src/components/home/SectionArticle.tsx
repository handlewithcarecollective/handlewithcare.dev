import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  children: ReactNode;
}

export function HomeSectionArticle({ className, children }: Props) {
  return (
    <article
      className={twMerge(
        "border-x-blueprint mt-4 flex min-h-auto flex-col justify-between px-7 py-0.5 pb-10 md:mt-8 md:min-h-[25rem]",
        className,
      )}
    >
      {children}
    </article>
  );
}
