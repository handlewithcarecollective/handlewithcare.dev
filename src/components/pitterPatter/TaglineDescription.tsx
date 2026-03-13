import { Paragraph } from "./Paragraph";
import { PitterPatterStar } from "./PitterPatterFlower";

interface Props {
  heading: string;
  content: string;
  light?: boolean;
}

export function TaglineDescription({ heading, content, light = false }: Props) {
  return (
    <div className={`flex basis-1/3 gap-5 ${light ? "opacity-40" : ""}`}>
      <PitterPatterStar className="mt-1 shrink-0" />
      <div>
        <h3 className="mb-3 text-base leading-[normal] md:mb-3 md:text-base">
          {heading}
        </h3>
        <Paragraph className="text-sm md:max-w-[250px] md:text-sm">
          {content}
        </Paragraph>
      </div>
    </div>
  );
}
