/* eslint-disable @typescript-eslint/no-require-imports */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com", 
      },
      {
        protocol: "http",
        hostname: "188.121.111.8",
        port: "3003",
      },
    ],
  },
  async rewrites() {
    return [
     {
      source: '/api/proxy/:path*',  
      destination: '/api/proxy/:path*',  
    },
    {
      source: '/api/:path*',
      destination: 'http://188.121.111.8:3003/api/:path*',
    },
    ];
  },
};

module.exports = withNextIntl(nextConfig);