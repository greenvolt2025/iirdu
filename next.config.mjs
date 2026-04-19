/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    serverComponentsExternalPackages: ["ws"],
  },
};

export default nextConfig;
