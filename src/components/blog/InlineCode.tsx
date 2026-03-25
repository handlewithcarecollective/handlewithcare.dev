import { RawCode, Inline, highlight } from "codehike/code";

export async function InlineMdxCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "dracula");
  return <Inline code={highlighted} />;
}

export async function InlineCode({ children }: { children: string }) {
  const highlighted = await highlight(
    { lang: "txt", meta: "", value: children },
    "dracula",
  );
  return (
    <Inline
      className="rounded-sm bg-[#282A36] px-[1px] pt-[2px] text-sm md:text-lg"
      code={highlighted}
    />
  );
}
