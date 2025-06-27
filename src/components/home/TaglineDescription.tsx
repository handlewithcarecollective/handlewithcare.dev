import { HomeHeading } from "./Heading";
import { HomeParagraph } from "./Paragraph";

interface Props {
  heading: string;
  content: string;
}

export function TaglineDescription({ heading, content }: Props) {
  return (
    <div className="grow basis-1/3">
      <h3 className="mb-1 text-base leading-[normal] font-bold md:text-xl">
        {heading}
      </h3>
      <HomeParagraph>{content}</HomeParagraph>
    </div>
  );
}
