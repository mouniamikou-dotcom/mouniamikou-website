import { getBlogPosts } from "@/sanity/lib/blogPost";
import { localizedPath, pageAlternates, SITE_URL } from "@/i18n/routes";

export const revalidate = 3600;

export default async function sitemap() {
  const paths = ["/", "/about", "/real-estate", "/settling-in-portugal", "/business-creation-portugal", "/contact", "/blogs"];
  const staticPages = paths.flatMap(path => ["en", "fr"].map(language => ({
    url: SITE_URL + localizedPath(path, language),
    alternates: { languages: pageAlternates(path, language).languages },
  })));
  const posts = await getBlogPosts();
  const blogPages = posts.flatMap(post => (post.hasFrench ? ["en", "fr"] : ["en"]).map(language => ({
    url: SITE_URL + localizedPath(`/blogs/${post.slug.current}`, language),
    lastModified: new Date(post._updatedAt || post.publishedAt),
    alternates: { languages: pageAlternates(`/blogs/${post.slug.current}`, language, post.hasFrench).languages },
  })));
  return [...staticPages, ...blogPages];
}
