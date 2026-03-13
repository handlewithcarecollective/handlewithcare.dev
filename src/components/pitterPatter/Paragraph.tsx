import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  children: ReactNode;
}

export function Paragraph({ className, children }: Props) {
  return (
    <p className={twMerge("md:text-md text-base lg:text-lg", className)}>
      {children}
    </p>
  );
}
