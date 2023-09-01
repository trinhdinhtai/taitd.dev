import { defineDocumentType } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
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
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));
