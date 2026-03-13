import { defineField, defineType } from "sanity";

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich Text Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
