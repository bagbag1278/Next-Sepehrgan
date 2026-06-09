const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
      source: '/api/:path*',
        destination: 'http://188.121.111.8:3003/api/:path*',
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);