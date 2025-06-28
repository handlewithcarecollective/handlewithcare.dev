import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { remarkCodeHike, recmaCodeHike, CodeHikeConfig } from "codehike/mdx";

const nextConfig: NextConfig = {
  output: "export",
  ...(process.env.NODE_ENV === "production" && { distDir: "build" }),
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const codeHikeConfig: CodeHikeConfig = {
  components: {
    code: "Code",
    inlineCode: "InlineCode",
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [[remarkCodeHike, codeHikeConfig]],
    recmaPlugins: [[recmaCodeHike, codeHikeConfig]],
    jsx: true,
  },
});

export default withMDX(nextConfig);
