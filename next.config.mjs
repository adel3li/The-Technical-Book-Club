/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export to ./out (deployed by Netlify, see netlify.toml)
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
