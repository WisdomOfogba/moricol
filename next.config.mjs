/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "i5.walmartimages.com",
      },
      {
        hostname: "img.freepik.com",
      },
    ],
  },
};

export default nextConfig;
