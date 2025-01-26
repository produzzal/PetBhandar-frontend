import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // This allows all external domains
      },
    ],
  },
};

export default nextConfig;
