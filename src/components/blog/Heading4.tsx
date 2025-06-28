import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Heading4({ children }: Props) {
  return (
    <h3 className="font-headings text-lg leading-[1] font-extralight uppercase md:text-2xl">
      {children}
    </h3>
  );
}
