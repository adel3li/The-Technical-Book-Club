/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export to ./out (deployed on Vercel)
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
