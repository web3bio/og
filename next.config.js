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
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["chrome-aws-lambda", "puppeteer-core"],
  },
};

module.exports = nextConfig;
