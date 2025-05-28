/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    // This will allow the build to succeed despite ESLint warnings
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;