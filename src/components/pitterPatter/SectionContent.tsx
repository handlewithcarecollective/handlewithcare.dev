import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  children: ReactNode;
}

export function SectionContent({ className, children }: Props) {
  return (
    <div
      className={twMerge("px-3 py-0 md:px-10 lg:w-[640px] lg:px-0", className)}
    >
      {children}
    </div>
  );
}
