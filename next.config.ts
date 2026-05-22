import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: 'http://next.genzuni.website/api/:path*', 
      },
    ]
  },
};

export default nextConfig;
