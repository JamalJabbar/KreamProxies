import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: "/KreamProxies",
  assetPrefix: "/KreamProxies/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: process.cwd()
  }
}

export default nextConfig
