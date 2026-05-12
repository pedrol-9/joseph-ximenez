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
};

export default nextConfig;
