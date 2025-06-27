import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  ...(process.env.NODE_ENV === "production" && { distDir: "build" }),
  trailingSlash: true,
};

export default nextConfig;
