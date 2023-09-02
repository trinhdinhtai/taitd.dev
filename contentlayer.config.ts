import { makeSource } from "contentlayer/source-files";
import { Post } from "./lib/contentlayer/post";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [[rehypeKatex], [rehypeSlug]],
  },
});
