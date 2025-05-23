import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
        pathname: '/**',
      },
         {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
