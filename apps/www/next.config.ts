import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@studio-blocks/blocks-ui"],
};

export default nextConfig;
