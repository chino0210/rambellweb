import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "localhost:3000",
    "192.168.1.207:3000",
  ],
};

export default nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
