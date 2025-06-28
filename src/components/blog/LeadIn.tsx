import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function LeadIn({
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className="decoration-green text-lg font-bold underline underline-offset-8 md:text-2xl">
      {children}
    </span>
  );
}
