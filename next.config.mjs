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
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "**",
      },

      { protocol: "https", hostname: "cdn.pixabay.com", pathname: "**" },
      { protocol: "https", hostname: "pixabay.com", pathname: "**" },
    ],
  },
  // {
  //   domains: ["fsboafrica.com, github.com"],
  // },
};

export default nextConfig;
