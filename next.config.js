const legacyBlogPaths = require('./src/i18n/legacy-paths.json');

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
      const redirects = [
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
      return [
        ...redirects,
        ...Object.entries(legacyBlogPaths).map(([source, destination]) => ({
          source: encodeURI(source), destination, permanent: true,
        })),
        ...Object.entries(legacyBlogPaths).filter(([source]) => source.startsWith('/blogs/')).map(([source, destination]) => ({
          source: source.replace('/blogs/', '/fr/articles/'),
          destination: destination.replace('/blogs/', '/fr/articles/'),
          permanent: true,
        })),
      ];
    },
}

module.exports = nextConfig
