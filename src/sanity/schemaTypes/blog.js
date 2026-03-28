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
          { title: "Visa Portugal", value: "visa-portugal" },
          { title: "Real Estate", value: "real-estate" },
          { title: "Business", value: "business" },
          { title: "Tax", value: "tax" },
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
