/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["media4.giphy.com", "media0.giphy.com","images.unsplash.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'playwright': false,
      };
    }
    return config;
  },
};

export default nextConfig;
