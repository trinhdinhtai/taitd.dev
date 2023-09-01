import { makeSource } from "contentlayer/source-files";
import { Post } from "./lib/contentlayer/post";

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post],
});
