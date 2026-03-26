export default function sitemap() {
  const baseUrl = 'https://mouniamikou.com';

  const pages = [
    { url: '/', priority: 1.0, changeFrequency: 'monthly' },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/real-estate', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/settling-in-portugal', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/business-creation-portugal', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.7, changeFrequency: 'yearly' },
    { url: '/blogs', priority: 0.8, changeFrequency: 'weekly' },
  ];

  return pages.map(({ url, priority, changeFrequency }) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
