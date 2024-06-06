import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allAuthors, allPosts } from "@/.contentlayer/generated"

import { absoluteUrl, formatDate } from "@/lib/utils"
import Mdx from "@/components/mdx/mdx-components"

import "@/styles/mdx.css"

import { Metadata } from "next"
import { PostSeries, SeriesItem } from "@/types"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { getTableOfContents } from "@/lib/toc"
import BreadcrumbNavigation from "@/components/layout/breadcrumb-navigation"
import LikeButton from "@/components/like-button"
import PostMetrics from "@/components/post-metrics"
import PostSeriesBox from "@/components/post-series"
import PostComment from "@/components/posts/post-comment"
import SocialShare from "@/components/social-share"
import TableOfContents from "@/components/toc"

const BASE_URL = env.NEXT_PUBLIC_APP_URL

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const { title, description, authors } = post

  const ogUrl = new URL(`${BASE_URL}/api/og`)
  ogUrl.searchParams.set("heading", title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: title,
    description: description,
    authors: authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl.toString()],
    },
  }
}

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    return null
  }

  if (post?.series) {
    const seriesPosts: SeriesItem[] = allPosts
      .filter((p) => p.series?.title === post.series?.title)
      .sort((a, b) => Number(a.series!.order) - Number(b.series!.order))
      .map((p) => {
        return {
          title: p.title,
          slug: p.slug,
          published: p.published,
          isCurrent: p.slug === post.slug,
        }
      })
    if (seriesPosts.length > 0) {
      return {
        ...post,
        series: { ...post.series, posts: seriesPosts } as PostSeries,
      }
    }
  }

  return post
}

const PostPage = async ({ params }: PostPageProps) => {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  const toc = await getTableOfContents(post.body.raw)

  return (
    <article className="relative lg:gap-10 xl:grid xl:max-w-6xl xl:grid-cols-[1fr_250px]">
      {/* Blog content */}
      <div className="w-full min-w-0">
        <BreadcrumbNavigation pageTitle={post.title} />

        <div>
          <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex space-x-2 text-lg text-muted-foreground">
            {post.date && (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            )}
            <span>&middot;</span>
            <span>{post.readingTime} min read</span>
            <span>&middot;</span>
            <PostMetrics slug={post.slugAsParams} />
          </div>

          {authors?.length ? (
            <div className="mt-4 flex space-x-4">
              {authors.map((author) =>
                author ? (
                  <Link
                    key={author._id}
                    href={`https://twitter.com/${author.twitter}`}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <Image
                      src={author.avatar}
                      alt={author.title}
                      width={42}
                      height={42}
                      className="rounded-full bg-white"
                    />
                    <div className="flex-1 text-left leading-tight">
                      <p className="font-medium">{author.title}</p>
                      <p className="text-[12px] text-muted-foreground">
                        @{author.twitter}
                      </p>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          ) : null}

          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={832}
              height={405}
              className="my-8 rounded-md border bg-muted transition-colors"
              priority
            />
          )}
        </div>

        {post?.series && (
          <div className="not-prose">
            <PostSeriesBox series={post.series} />
          </div>
        )}

        <Mdx code={post.body.code} />

        <hr className="my-4" />

        {/* Post tag */}
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
          <SocialShare
            text={`${post.title} via ${siteConfig.handle}`}
            url={`${BASE_URL}/${post._raw.flattenedPath}`}
          />
        </div>

        <PostComment />
      </div>

      {/* Table of contents */}
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] pt-10">
          <TableOfContents toc={toc} />

          <hr className="my-4" />

          <div className="flex items-center justify-between">
            <LikeButton slug={post.slugAsParams} />
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostPage
