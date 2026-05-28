import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/KreamProxies" : "",
  assetPrefix: isProd ? "/KreamProxies/" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: process.cwd()
  }
}

export default nextConfig
