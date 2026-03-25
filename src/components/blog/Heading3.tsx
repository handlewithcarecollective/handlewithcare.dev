import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Heading3({ children }: Props) {
  return (
    <h3 className="font-headings mt-8 mb-4 text-xl leading-[1] font-extralight uppercase md:text-3xl">
      {children}
    </h3>
  );
}
