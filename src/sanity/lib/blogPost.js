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


export const getBlogPosts = cache(async () => {
  return client.withConfig({ useCdn: false }).fetch(
    `*[_type == "blogPost" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      _id, title { en, fr }, slug, category, publishedAt, _updatedAt,
      mainImage { asset-> { url } },
      "excerpt": coalesce(excerpt, description),
      "hasFrench": defined(title.fr) && count(body.fr) > 0
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
});
