import { ReactNode } from "react";
import { HomeParagraph } from "./Paragraph";

interface Props {
  name: string;
  title: string;
  children: ReactNode;
}

export function Testimonial({ name, title, children }: Props) {
  return (
    <div className="basis-1/2 px-4">
      <p className="font-headings my-2 text-lg font-extralight uppercase md:text-2xl">
        {name}
      </p>
      <p className="mb-4">{title}</p>
      <HomeParagraph>{children}</HomeParagraph>
    </div>
  );
}
