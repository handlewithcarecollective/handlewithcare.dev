import type { MDXComponents } from "mdx/types";
import { Code } from "./components/blog/Code";
import { InlineCode } from "./components/blog/InlineCode";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
    InlineCode,
  };
}
