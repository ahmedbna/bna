import { withNextVideo } from 'next-video/process';
/** @type {import('next').NextConfig} */
const nextConfig = {
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
  async headers() {
    return [
      // {
      //   // matching all API routes
      //   source: '/api/:path*',
      //   headers: [
      //     // omitted for brevity...
      //   ],
      // },
      {
        source: '/api/edgedelete',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'false' },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date',
          },
        ],
      },
    ];
  },
};

export default withNextVideo(nextConfig);
