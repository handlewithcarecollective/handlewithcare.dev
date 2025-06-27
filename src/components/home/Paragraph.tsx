import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  children: ReactNode;
}

export function HomeParagraph({ className, children }: Props) {
  return (
    <p className={twMerge("text-base md:text-xl", className)}>{children}</p>
  );
}
