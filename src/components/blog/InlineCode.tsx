import { RawCode, Inline, highlight } from "codehike/code";
import { ReactNode } from "react";

export async function InlineMdxCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-light");
  return <Inline code={highlighted} />;
}

export async function InlineCode({ children }: { children: string }) {
  const highlighted = await highlight(
    { lang: "tsx", meta: "", value: children },
    "github-light",
  );
  return <Inline className="text-sm md:text-lg" code={highlighted} />;
}
