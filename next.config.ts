import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'scontent.cdninstagram.com',
      'instagram.com',
      'scontent-gmp1-1.cdninstagram.com',
      'scontent-ssn1-1.cdninstagram.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
    ],
  },
};

export default nextConfig;
