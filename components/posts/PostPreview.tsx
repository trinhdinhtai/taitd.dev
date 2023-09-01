import { Post } from "@/.contentlayer/generated";

type PostPreviewProps = {
  post: Post;
};
const PostPreview = ({ post }: PostPreviewProps) => {
  return <div>{post.title}</div>;
};

export default PostPreview;
