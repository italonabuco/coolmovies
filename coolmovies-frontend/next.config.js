/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      },
    ];
  },
  reactStrictMode: true,
};
