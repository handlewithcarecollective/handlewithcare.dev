import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  children: ReactNode;
}

export function HomeSectionHeader({ className, children }: Props) {
  return (
    <header
      className={twMerge(
        "border-x-solid border-x-brown mb-8 h-48 border-x-3 px-7 py-0.5 pt-10 md:h-80",
        className,
      )}
    >
      {children}
    </header>
  );
}
