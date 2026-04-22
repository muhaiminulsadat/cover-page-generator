import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    viewTransition: true,
  },
  allowedDevOrigins: ["192.168.0.111", "*", "**"],
};

export default nextConfig;
