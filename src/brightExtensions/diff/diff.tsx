import { ReactElement } from "react";
import { Code as BrightCode } from "bright";
import { diff } from "./extension";
import { Code } from "@/components/blog/Code";

export function Diff({
  children,
}: {
  children: [
    ReactElement<Parameters<typeof Code>[0]>,
    ReactElement<Parameters<typeof Code>[0]>,
  ];
}) {
  const firstChild = children[0];
  if (!firstChild) return null;
  console.log(firstChild.props.codeblock.lang);
  return (
    <BrightCode
      lineNumbers
      lang={firstChild.props.codeblock.lang}
      title={firstChild.props.codeblock.meta}
      theme="dracula"
      className="text-sm md:text-base"
      extensions={[diff]}
    >
      {children.map((child) => (
        <div key={child.props.codeblock.value}>
          <div className={`language-${child.props.codeblock.lang}`}>
            {child.props.codeblock.value}
          </div>
        </div>
      ))}
    </BrightCode>
  );
}
