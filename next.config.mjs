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
      {
        protocol: "http",
        hostname: "api.ro-ja.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.ro-ja.com",
        pathname: "**",
      },

      { protocol: "https", hostname: "cdn.pixabay.com", pathname: "**" },
      { protocol: "https", hostname: "pixabay.com", pathname: "**" },
    ],
  },
  // {
  //   domains: ["fsboafrica.com, github.com"],
  // },

  //TODO: Remove this after fixing the type errors
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
