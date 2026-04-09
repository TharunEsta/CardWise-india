import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".cardwise-next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"]
  }
};

export default nextConfig;
