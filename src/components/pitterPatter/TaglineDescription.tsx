import { Paragraph } from "./Paragraph";
import { PitterPatterStar } from "./PitterPatterFlower";

interface Props {
  heading: string;
  content: string;
  light?: boolean;
}

export function TaglineDescription({ heading, content, light = false }: Props) {
  return (
    <div className={`flex basis-1/3 gap-4 ${light ? "opacity-40" : ""}`}>
      <PitterPatterStar className="mt-1" />
      <div>
        <h3 className="mb-1 text-base leading-[normal] md:text-xl">
          {heading}
        </h3>
        <Paragraph className="md:text-md lg:text-md md:max-w-[250px]">
          {content}
        </Paragraph>
      </div>
    </div>
  );
}
