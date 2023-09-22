import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allAuthors, allPosts } from "@/.contentlayer/generated"

import { absoluteUrl, formatDate } from "@/lib/utils"
import { Icons } from "@/components/icons"
import Mdx from "@/components/mdx-components"

import "@/styles/mdx.css"

import { Metadata } from "next"

import { env } from "@/env.mjs"
import { getTableOfContents } from "@/lib/toc"
import DashboardTableOfContents from "@/components/toc"

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

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
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
    <article className="relative lg:gap-10 xl:grid xl:max-w-6xl xl:grid-cols-[1fr_300px]">
      {/* Blog content */}
      <div className="w-full min-w-0">
        <Link href="/blog" className="flex items-center">
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>

        <div className="mt-6">
          {post.date && (
            <time
              dateTime={post.date}
              className="block text-sm text-muted-foreground"
            >
              Published on {formatDate(post.date)}
            </time>
          )}

          <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
            {post.title}
          </h1>

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

        <Mdx code={post.body.code} />
      </div>

      {/* Table of contents */}
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </article>
  )
}

export default PostPage
