import { getBlogPost } from "@/sanity/lib/blogPost";
import { getRequestLanguage } from "@/i18n/server";
import { localizedPath, pageAlternates, SITE_URL } from "@/i18n/routes";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const language = await getRequestLanguage();
  const hasFrench = Boolean(post.title?.fr && post.body?.fr?.length);
  const title = post.seo?.[language]?.metaTitle || post.title?.[language];
  const description = post.seo?.[language]?.metaDescription || post.description?.[language];
  const url = SITE_URL + localizedPath(`/blogs/${slug}`, language);
  return {
    title: { absolute: title },
    description,
    alternates: pageAlternates(`/blogs/${slug}`, language, hasFrench),
    openGraph: {
      title, description, url, type: "article",
      locale: language === "fr" ? "fr_FR" : "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      ...(post.mainImage?.asset?.url && { images: [post.mainImage.asset.url] }),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogSlugLayout({ children, params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  const language = await getRequestLanguage();
  const jsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title?.[language],
    description: post.seo?.[language]?.metaDescription || post.description?.[language],
    inLanguage: language,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    url: SITE_URL + localizedPath(`/blogs/${slug}`, language),
    author: {
      "@type": "Person",
      "@id": SITE_URL + "/#person",
      name: "Mounia Mikou",
      url: SITE_URL + localizedPath("/about", language),
    },
    publisher: { "@id": SITE_URL + "/#legalservice" },
    ...(post.mainImage?.asset?.url && { image: post.mainImage.asset.url }),
  } : null;
  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\u003c') }} />}
      {children}
    </>
  );
}
