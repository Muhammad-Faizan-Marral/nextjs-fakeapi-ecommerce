import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ allow ALL domains
      },
      {
        protocol: "http",
        hostname: "**", // ✅ allow ALL http domains
      },
    ],
  },
};

export default nextConfig;
