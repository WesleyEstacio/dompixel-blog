/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = 'source-map'
    }
    return config
  },
}

export default nextConfig
