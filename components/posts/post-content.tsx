import Link from "next/link";
import { Mdx } from "../mdx";
import PostSeriesBox from "./post-series-box";
import SocialShareButton from "../social-share-button";
import { defaultAuthor } from "@/lib/metadata";
import { BASE_URL } from "@/constants";

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
      <Mdx code={post.body.code} />
      <hr className="my-4" />
      <div className="flex flex-row items-center justify-between">
        {post.tags && (
          <ul className="m-0 list-none space-x-2 p-0 text-sm text-muted-foreground">
            {post.tags.map((tag: string) => (
              <li className="inline-block p-0" key={tag}>
                <Link
                  href={`/tags/${tag}`}
                  className="inline-block transition hover:text-muted-foreground/70"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <SocialShareButton
          text={`${post.title} via ${defaultAuthor.handle}`}
          url={`${BASE_URL}/${post._raw.flattenedPath}`}
        />
      </div>
    </article>
  );
};

export default PostContent;
