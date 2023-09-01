import { Post } from "@/.contentlayer/generated";

type PostPreviewProps = {
  post: Post;
};
const PostPreview = ({ post }: PostPreviewProps) => {
  console.log("🚀 ~ file: PostPreview.tsx:7 ~ PostPreview ~ post:", post);
  return <div>{post.title}</div>;
};

export default PostPreview;
