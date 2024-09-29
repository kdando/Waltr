/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framemark.vam.ac.uk',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.metmuseum.org',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
