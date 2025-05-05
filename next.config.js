/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/bookclub-website',
  assetPrefix: '/bookclub-website/',
}

module.exports = nextConfig
