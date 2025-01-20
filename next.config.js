/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['localhost']
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  distDir: '.next',
  experimental: {
    appDir: false
  }
};

module.exports = nextConfig;