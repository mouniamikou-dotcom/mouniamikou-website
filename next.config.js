/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            port: '',
            pathname: '/images/**',
          },
        ],
      },
    async redirects() {
      return [
        {
          source: '/Realestate',
          destination: '/real-estate',
          permanent: true,
        },
        {
          source: '/installationportugal',
          destination: '/settling-in-portugal',
          permanent: true,
        },
      ];
    },
}

module.exports = nextConfig
