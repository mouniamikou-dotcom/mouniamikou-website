import HomePage from '@/components/HomePage';
import { getBlogPosts } from '@/sanity/lib/blogPost';
import { getRequestLanguage } from '@/i18n/server';

export default async function Home() {
  const [language, posts] = await Promise.all([getRequestLanguage(), getBlogPosts()]);
  return <HomePage language={language} posts={posts} />;
}
