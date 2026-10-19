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
          source: '/blogs/complete-guide-starting-your-business-in-portugal-in-2025',
          destination: '/blogs/complete-guide-starting-your-business-in-portugal-in-2026',
          permanent: true,
        },
        {
          source: '/blogs/complete-guide-to-portugal-visas-2025-how-to-choose-the-right-option-for-your-project',
          destination: '/blogs/complete-guide-to-portugal-visas-2026-how-to-choose-the-right-option-for-your-project',
          permanent: true,
        },
        {
          source: '/blogs/starting-a-business-in-portugal-2025-guide-to-the-d2-visa-for-entrepreneurs',
          destination: '/blogs/starting-a-business-in-portugal-2026-guide-to-the-d2-visa-for-entrepreneurs',
          permanent: true,
        },
        {
          source: '/blogs/portugal-digital-nomad-visa-d8-complete-2025-guide',
          destination: '/blogs/portugal-digital-nomad-visa-d8-complete-2026-guide',
          permanent: true,
        },
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
        {
          source: '/business',
          destination: '/business-creation-portugal',
          permanent: true,
        },
      ];
    },
}

module.exports = nextConfig
