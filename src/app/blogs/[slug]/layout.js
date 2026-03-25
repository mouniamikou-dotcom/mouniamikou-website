import { client } from "@/sanity/lib/client";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      title { en, fr },
      description { en, fr },
      seo { en { metaTitle, metaDescription }, fr { metaTitle, metaDescription } }
    }`,
    { slug }
  );

  if (!post) return {};

  const title = post.seo?.en?.metaTitle || post.title?.en;
  const description = post.seo?.en?.metaDescription || post.description?.en;

  return {
    title,
    description,
    alternates: { canonical: `https://mouniamikou.com/blogs/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://mouniamikou.com/blogs/${slug}`,
      type: "article",
    },
  };
}

export default function BlogSlugLayout({ children }) {
  return children;
}
