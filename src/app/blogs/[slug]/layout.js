import { getBlogPost } from "@/sanity/lib/blogPost";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return {};

  const title = post.seo?.en?.metaTitle || post.title?.en;
  const description = post.seo?.en?.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `https://mouniamikou.com/blogs/${slug}`,
      languages: {
        'en': `https://mouniamikou.com/blogs/${slug}`,
        'fr': `https://mouniamikou.com/blogs/${slug}`,
        'x-default': `https://mouniamikou.com/blogs/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://mouniamikou.com/blogs/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogSlugLayout({ children, params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  const jsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seo?.en?.metaTitle || post.title?.en,
    "description": post.seo?.en?.metaDescription,
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt || post.publishedAt,
    "url": `https://mouniamikou.com/blogs/${slug}`,
    "author": {
      "@type": "Person",
      "@id": "https://mouniamikou.com/#person",
      "name": "Mounia Mikou",
      "url": "https://mouniamikou.com/about",
    },
    "publisher": {
      "@id": "https://mouniamikou.com/#legalservice",
    },
    ...(post.mainImage?.asset?.url && { "image": post.mainImage.asset.url }),
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
