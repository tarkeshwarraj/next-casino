/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side bundling के लिए playwright को खाली object से replace करो
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'playwright': false,
      };
    }
    return config;
  },
};

export default nextConfig;
