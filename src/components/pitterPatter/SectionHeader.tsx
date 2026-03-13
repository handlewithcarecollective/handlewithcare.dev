import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  children: ReactNode;
}

export function SectionHeader({ className, children }: Props) {
  return (
    <header
      className={twMerge(
        "font-headings mb-5 text-2xl md:mb-8 md:text-3xl",
        className,
      )}
    >
      {children}
    </header>
  );
}
