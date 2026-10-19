import { notFound } from "next/navigation";
import { getBlogPost } from "@/sanity/lib/blogPost";
import BlogPostContent from "./BlogPostContent";

export const revalidate = 3600;

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  return <BlogPostContent initialPost={post} />;
}
