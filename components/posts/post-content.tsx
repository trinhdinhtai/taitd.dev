import PostSeriesBox from "./post-series-box";

interface PostContentProps {
  post: any;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <article className="prose-a:prose-headings:font-heading prose mt-6 max-w-7xl dark:prose-invert hover:prose-a:text-accent-foreground prose-a:prose-headings:mb-3 prose-a:prose-headings:mt-8 prose-a:prose-headings:font-bold prose-a:prose-headings:leading-tight prose-a:prose-headings:no-underline lg:mr-auto lg:max-w-2xl">
      <h1 className="font-heading mb-2">{post.title}</h1>
      {post.description && (
        <p className="mb-2 mt-0 text-xl text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      {post?.series && (
        <div className="not-prose">
          <PostSeriesBox data={post.series} />
        </div>
      )}
    </article>
  );
};

export default PostContent;
