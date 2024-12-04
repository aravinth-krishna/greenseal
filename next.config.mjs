/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.finnhub.io",
      },
      {
        protocol: "https",
        hostname: "static2.finnhub.io",
      },
      {
        protocol: "https",
        hostname: "static4.finnhub.io",
      },
      {
        protocol: "https",
        hostname: "i-invdn-com.investing.com",
      },
    ],
  },
};

export default nextConfig;
