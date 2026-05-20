import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    imageSizes: [420, 840],
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    preloadEntriesOnStart: false,
    webpackMemoryOptimizations: true,
  },
  onDemandEntries: {
    maxInactiveAge: 15 * 1000, // Keep compiled pages in memory for only 15 seconds
    pagesBufferLength: 1,      // Keep only 1 compiled page in memory buffer
  },
};

export default nextConfig;
