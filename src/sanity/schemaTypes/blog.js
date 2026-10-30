export default {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  preview: {
    select: {
      title: "title.en",
      media: "mainImage",
    },
    },
  fields: [
    {
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "fr", title: "French", type: "string" },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Corporate / Société", value: "business" },
          { title: "Real Estate / Immobilier", value: "real-estate" },
          { title: "Tax / tax", value: "tax" },
          { title: "Immigration", value: "visa-portugal" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "fr", title: "French", type: "text" },
      ],
      description: "A brief summary of the blog post (for SEO and previews).",
    },
    {
      name: "introduction",
      title: "intro",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "fr", title: "French", type: "text" },
      ],
      description: "Introduction text before the summary.",
    },
    {
      name: "body",
      title: "Body",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                  options: { isHighlighted: true },
                },
                {
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "fr",
          title: "French",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                  options: { isHighlighted: true },
                },
                {
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "sources",
      title: "Sources officielles / Official sources",
      description: "Références réellement utilisées dans cet article. Indiquer le texte ou l’article pertinent et privilégier les sources officielles à jour.",
      type: "array",
      of: [{
        type: "object",
        name: "legalSource",
        fields: [
          {
            name: "title", title: "Intitulé / Label", type: "object",
            fields: [
              { name: "fr", title: "Français", type: "string" },
              { name: "en", title: "English", type: "string" },
            ],
            validation: (Rule) => Rule.required(),
          },
          { name: "url", title: "URL", type: "url", validation: (Rule) => Rule.required().uri({ scheme: ["https"] }) },
        ],
        preview: { select: { title: "title.fr", subtitle: "url" } },
      }],
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "seo", // assuming you have a custom `seo` object type
        },
        {
          name: "fr",
          title: "French",
          type: "seo",
        },
      ],
    },

    {
      name: "suggestedBlog",
      type: "reference",
      title: "Suggested Blog Post",
      to: [{ type: "blogPost" }],
    },
  ],
};
