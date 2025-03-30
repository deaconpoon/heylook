/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    appDir: true,
  },
  distDir: ".next",
  reactStrictMode: true,
};

module.exports = nextConfig;
