import type { MDXComponents } from "mdx/types";
import { Code } from "./components/blog/Code";
import { InlineCode, InlineMdxCode } from "./components/blog/InlineCode";
import { BlockQuote } from "./components/blog/BlockQuote";
import { Heading3 } from "./components/blog/Heading3";
import { Heading4 } from "./components/blog/Heading4";
import { FootnoteRef } from "./components/blog/FootnoteRef";
import { Link } from "./components/blog/Link";
import { NumberedList } from "./components/blog/NumberedList";
import { BulletList } from "./components/blog/BulletList";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
    InlineCode: InlineMdxCode,
    code: InlineCode,
    blockquote: BlockQuote,
    h3: Heading3,
    h4: Heading4,
    FootnoteRef,
    a: Link,
    ol: NumberedList,
    ul: BulletList,
  };
}
