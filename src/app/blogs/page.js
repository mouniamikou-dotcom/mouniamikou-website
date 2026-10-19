import BlogList from "@/components/BlogList";
import { getBlogPosts } from "@/sanity/lib/blogPost";

export default async function BlogsPage() {
  return <BlogList initialPosts={await getBlogPosts()} headingLevel="h1" />;
}
