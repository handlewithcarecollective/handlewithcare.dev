import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  ...(process.env.NODE_ENV === "production" && { distDir: "build" }),
  trailingSlash: true,
  webpack: (config, { dev }) => {
    if (!dev) {
      // Disable caching for postcss in production
      // Without this, the TailwindCSS output gets
      // cached and newly added utility classes
      // don't show up in the production bundle
      const rules = config.module.rules.find(
        (rule: any) => typeof rule.oneOf === "object",
      );
      if (rules) {
        rules.oneOf.forEach((rule: any) => {
          if (rule.use && Array.isArray(rule.use)) {
            rule.use.forEach((use: any) => {
              if (use.loader && use.loader.includes("postcss-loader")) {
                use.options = {
                  ...use.options,
                  sourceMap: false,
                  cacheDirectory: false,
                };
              }
            });
          }
        });
      }
    }
    return config;
  },
};

export default nextConfig;
