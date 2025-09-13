/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google Avatar
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub Avatar
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com", // Twitter Avatar
      },
    ],
  },
};

module.exports = nextConfig;
