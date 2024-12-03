import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // https://linked-posts.routemisr.com/users/signin
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linked-posts.routemisr.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
