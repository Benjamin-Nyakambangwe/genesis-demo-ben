/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fsboafrica.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "**",
      },
    ],
  },
  // {
  //   domains: ["fsboafrica.com, github.com"],
  // },
};

export default nextConfig;
