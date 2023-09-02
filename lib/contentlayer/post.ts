import GithubSlugger from "github-slugger";
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
    headings: {
      type: "json",
      resolve: async (doc) => {
        // use same package as rehypeSlug so toc and sluggified headings match
        // https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
        const slugger = new GithubSlugger();

        // https://stackoverflow.com/a/70802303
        const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g;

        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              heading: flag?.length,
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          },
        );

        return headings;
      },
    },
  },
}));
