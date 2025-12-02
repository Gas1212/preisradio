import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack to avoid dependency tracking issues on serv00
  turbo: {
    disabled: true,
  },
};

export default nextConfig;
