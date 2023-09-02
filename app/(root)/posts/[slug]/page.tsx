import { Series, allPosts } from "@/.contentlayer/generated";
import BreadcrumbNavigation from "@/components/posts/breadcrumb-navigation";
import TableOfContents from "@/components/posts/table-of-content";
import { formatDate } from "@/lib/utils";
import { PostSeries, SeriesItem } from "@/types";
import { notFound } from "next/navigation";

async function getPostFromParams(params: PostProps["params"]): Promise<any> {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    null;
  }

  if (post?.series) {
    const seriesPosts: SeriesItem[] = allPosts
      .filter((p) => p.series?.title.trim() === post.series?.title.trim())
      .sort((a, b) => Number(a.series!.order) - Number(b.series!.order))
      .map((p) => {
        return {
          title: p.title,
          slug: p.slug,
          status: p.status,
          isCurrent: p.slug === post.slug,
        };
      });
    if (seriesPosts.length > 0) {
      return {
        ...post,
        series: { ...post.series, posts: seriesPosts } as PostSeries,
      };
    }
  }

  return post;
}

interface PostProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PostProps) => {
  const post = await getPostFromParams(params);
  console.log("🚀 ~ file: page.tsx:46 ~ PostPage ~ post:", post);

  if (
    !post ||
    (process.env.NODE_ENV === "development" && post.status !== "published")
  ) {
    notFound();
  }

  return (
    <div className="container max-w-6xl pb-10">
      <BreadcrumbNavigation title={post.title} />

      <div className="flex flex-col lg:flex-row">
        <div className="lg:hidden">
          <div className="mb-4 mt-1 text-sm leading-snug text-muted-foreground">
            <p className="mb-2">{`${post.readTimeMinutes} mins read`}</p>
            <time>Originally published: {formatDate(post.publishedDate)} </time>
            <br />
            {post.lastUpdatedDate && (
              <time>Last updated: {formatDate(post.lastUpdatedDate)}</time>
            )}
          </div>
        </div>

        <TableOfContents chapters={post.heading} />
      </div>
    </div>
  );
};

export default PostPage;
