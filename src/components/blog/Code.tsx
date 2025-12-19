import { RawCode } from "codehike/code";
import { Code as BrightCode } from "bright";
import { focus } from "@/brightExtensions/focus";

export async function Code({ codeblock }: { codeblock: RawCode }) {
  return (
    <BrightCode
      lang={codeblock.lang}
      title={codeblock.meta}
      theme="dracula"
      className="text-sm md:text-base"
      extensions={[focus]}
    >
      {codeblock.value}
    </BrightCode>
  );
}
