import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  children: ReactNode;
}

export function Paragraph({ className, children }: Props) {
  return (
    <p
      className={twMerge(
        "text-base leading-[135%] md:text-lg lg:text-xl",
        className,
      )}
    >
      {children}
    </p>
  );
}
