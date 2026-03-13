import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  children: ReactNode;
}

export function PageHeader({ className, children }: Props) {
  return (
    <header
      className={twMerge(
        "border-green my-4 h-62 border-x-1 border-solid px-7 py-0.5 pt-10 md:my-6 md:h-50 lg:h-68 lg:border-x-2",
        className,
      )}
    >
      {children}
    </header>
  );
}
