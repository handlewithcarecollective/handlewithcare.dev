import type { MDXComponents } from "mdx/types";
import { Code } from "./components/blog/Code";
import { InlineMdxCode } from "./components/blog/InlineCode";
import { BlockQuote } from "./components/blog/BlockQuote";
import { Heading3 } from "./components/blog/Heading3";
import { Heading4 } from "./components/blog/Heading4";
import { Link } from "./components/blog/Link";
import { NumberedList } from "./components/blog/NumberedList";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
    InlineCode: InlineMdxCode,
    blockquote: BlockQuote,
    h3: Heading3,
    h4: Heading4,
    a: Link,
    ol: NumberedList,
  };
}
