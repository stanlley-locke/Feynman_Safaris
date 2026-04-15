import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(process.cwd()),
  images: {
    unoptimized: true, 
  },
  serverExternalPackages: ["@prisma/client"],
  // Turbopack configuration for Next.js 16 (minimal config)
  turbopack: {},
};

export default nextConfig;
