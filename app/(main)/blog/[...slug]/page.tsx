import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allAuthors, allPosts } from "@/.contentlayer/generated"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Mdx from "@/components/mdx-components"

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

interface PostPageProps {
  params: {
    slug: string[]
  }
}

const PostPage = async ({ params }: PostPageProps) => {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <article className="container relative max-w-4xl py-6 lg:py-12">
      <Link href="/blog" className="flex items-center">
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>

      <div className="mt-6">
        {post.date && (
          <time
            dateTime={post.date}
            className="text-muted-foreground block text-sm"
          >
            Published on {formatDate(post.date)}
          </time>
        )}

        <h1 className="font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl">
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
                    <p className="text-muted-foreground text-[12px]">
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
            className="bg-muted my-8 rounded-md border transition-colors"
            priority
          />
        )}
      </div>

      <Mdx code={post.body.code} />
    </article>
  )
}

export default PostPage
