/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ['doting-peacock-335.convex.cloud', 'files.edgestore.dev'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doting-peacock-335.convex.cloud',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
        port: '',
      },
    ],
  },
};

export default nextConfig;
