import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // মোবাইল / অন্য ডিভাইস থেকে লোকাল সার্ভারে ঢোকার জন্য
  allowedDevOrigins: ["192.168.1.10"], 
};

export default nextConfig;
