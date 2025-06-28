import { RawCode, Inline, highlight } from "codehike/code";

export async function InlineCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-light");
  return <Inline code={highlighted} />;
}
