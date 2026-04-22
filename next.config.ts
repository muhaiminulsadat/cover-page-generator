import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    viewTransition: true,
  },

  allowedDevOrigins: ["**", "*"],
};

export default nextConfig;
