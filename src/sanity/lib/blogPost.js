import { cache } from "react";
import { client } from "./client";

// ✅ Fetch Blog Post Data
export const getBlogPost = cache(async (slug) => {
  const query = `
    *[_type == "blogPost" && slug.current == $slug][0] {
      title { en, fr },
      mainImage {
        asset-> {
          url
        }
      },
      body { en, fr },
      publishedAt,
      _updatedAt,
      category,
      description { en, fr },
      introduction { en, fr },
      suggestedBlog-> {
        title { en, fr },
        category,
        publishedAt,
        mainImage {
          asset-> {
            url
          }
        },
        slug
      },
      seo { en, fr }
    }
  `;
  return await client.withConfig({ useCdn: false }).fetch(query, { slug }, { next: { revalidate: 3600 } });
});

