import { defineDocumentType } from "contentlayer/source-files";
import { calculateReadingTime } from "../utils";
import { Series } from "./series";

const tagOptions = [
  "starter",
  "development",
  "docs",
  "freelancing",
  "opinion",
  "jamstack",
  "frontend",
  "development",
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "gatsby",
  "tailwindcss",
];

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    description: {
      type: "string",
    },
    publishedDate: {
      type: "date",
      required: true,
    },
    lastUpdatedDate: {
      type: "date",
    },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string", options: tagOptions },
      required: false,
    },
    series: {
      type: "nested",
      of: Series,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    readTimeMinutes: {
      type: "number",
      resolve: (doc) => calculateReadingTime(doc.body.raw),
    },
  },
}));
