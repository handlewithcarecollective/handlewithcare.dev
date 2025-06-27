import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  children: ReactNode;
}

export function HomeSectionWrapper({ className, children }: Props) {
  return <div className={twMerge("flex flex-col", className)}>{children}</div>;
}
