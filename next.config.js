/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["chrome-aws-lambda", "puppeteer-core"],
  },
};

module.exports = nextConfig;
