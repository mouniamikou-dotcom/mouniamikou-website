export default function robots() {
  return {
    rules: {
      userAgent: '*',
      ...(process.env.VERCEL_ENV === 'production' ? { allow: '/' } : { disallow: '/' }),
    },
    sitemap: 'https://mouniamikou.com/sitemap.xml',
  };
}
