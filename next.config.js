/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => [
    {
      source: "/api",
      destination: "/web3bio-social.jpg",
      permanent: true,
    },
  ],
  experimental: {
    serverComponentsExternalPackages: ["chrome-aws-lambda", "puppeteer-core"],
  },
};

module.exports = nextConfig;
