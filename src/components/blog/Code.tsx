import { RawCode } from "codehike/code";
import { Code as BrightCode } from "bright";

export async function Code({ codeblock }: { codeblock: RawCode }) {
  return (
    <BrightCode
      lang={codeblock.lang}
      title={codeblock.meta}
      theme="dracula"
      className="text-sm md:text-base"
    >
      {codeblock.value}
    </BrightCode>
  );
}
