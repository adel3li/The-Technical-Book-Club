/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: '/The-Technical-Book-Club',
  assetPrefix: '/The-Technical-Book-Club/',
}

module.exports = nextConfig
