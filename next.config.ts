import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // this will create build at /out directory
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  eslint: {
    ignoreDuringBuilds: true, // Optional: Disable ESLint during build
  },
  trailingSlash: true,
  basePath: '/next-stuff',
  assetPrefix: '/next-stuff',
};

export default nextConfig;
