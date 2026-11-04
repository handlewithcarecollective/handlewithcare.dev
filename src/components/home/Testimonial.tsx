import { ReactNode } from "react";
import { HomeParagraph } from "./Paragraph";

interface Props {
  name: string;
  title: string;
  children: ReactNode;
}

export function Testimonial({ name, title, children }: Props) {
  return (
    <div className="border-x-blueprint grow basis-1/2 px-4 pb-4 md:border-none md:pb-20">
      <p className="font-headings my-2 text-lg font-extralight uppercase md:text-2xl">
        {name}
      </p>
      <p className="mb-4">{title}</p>
      <HomeParagraph>{children}</HomeParagraph>
    </div>
  );
}
