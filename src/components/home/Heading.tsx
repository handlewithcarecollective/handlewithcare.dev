import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  id?: string | undefined;
  order: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string | undefined;
  children: ReactNode;
}

const HEADINGS = {
  "1": "h1",
  "2": "h2",
  "3": "h3",
  "4": "h4",
  "5": "h5",
  "6": "h6",
} as const;

export function HomeHeading({ id, order, className, children }: Props) {
  const Component = HEADINGS[order];

  return (
    <Component
      id={id}
      className={twMerge(
        "font-headings text-[1.825rem] leading-[0.9] font-extralight uppercase md:text-[2.825rem]",
        className,
      )}
    >
      {children}
    </Component>
  );
}
