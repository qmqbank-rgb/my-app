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
      {
        protocol: "https",
        hostname: "kjjsnqheahlpybarytej.supabase.co", // ✅ Supabase bucket
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;
