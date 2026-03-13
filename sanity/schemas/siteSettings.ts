import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "footerNavigation",
      title: "Footer Navigation",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
