import 'server-only';
import { cache } from "react";
import { client } from "./client";
import { editorialFetchOptions } from "../policy.cjs";

// Apply the site's typography preference to displayed CMS text, keeping URLs intact.
function normalizeTypography(value, key) {
  if (["url", "href", "slug", "_id", "_key", "_ref"].includes(key)) return value;
  if (typeof value === "string") return value.replace(/[\u2013\u2014]/g, "-").replace(/trabalhador indenpendente/gi, "trabalhador independente");
  if (Array.isArray(value)) return value.map(item => normalizeTypography(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, normalizeTypography(item, name)]));
  }
  return value;
}

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
      sources[] { _key, title { en, fr }, url },
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
  return normalizeTypography(await client.withConfig({ useCdn: false }).fetch(query, { slug }, editorialFetchOptions(process.env.VERCEL_ENV)));
});


export const getBlogPosts = cache(async () => {
  return normalizeTypography(await client.withConfig({ useCdn: false }).fetch(
    `*[_type == "blogPost" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      _id, title { en, fr }, slug, category, publishedAt, _updatedAt,
      mainImage { asset-> { url } },
      "excerpt": coalesce(excerpt, description),
      "hasFrench": defined(title.fr) && count(body.fr) > 0
    }`,
    {},
    editorialFetchOptions(process.env.VERCEL_ENV)
  ));
});
