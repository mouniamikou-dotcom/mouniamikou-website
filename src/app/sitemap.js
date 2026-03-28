import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'bfaunxy0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

export default async function sitemap() {
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

  const staticPages = pages.map(({ url, priority, changeFrequency }) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const posts = await client.fetch(
    `*[_type == "blogPost"] { "slug": slug.current, publishedAt }`
  );

  const blogPages = posts.map(({ slug, publishedAt }) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: publishedAt ? new Date(publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
