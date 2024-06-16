"use client"

import Image from "next/image"
import Link from "next/link"
import { Post } from "@/.contentlayer/generated"
import { api } from "@/trpc/react"
import { EyeIcon, ThumbsUpIcon } from "lucide-react"

import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: Post
  index: number
}

const PostCard = ({ post, index }: PostCardProps) => {
  const viewQuery = api.view.get.useQuery({
    slug: post.slugAsParams,
  })

  const likeQuery = api.like.get.useQuery({
    slug: post.slugAsParams,
  })

  return (
    <article className="group relative flex flex-col space-y-2 rounded-2xl border bg-background p-3">
      <div className="relative w-full">
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={630}
          className="my-auto aspect-[2/1] h-auto animate-reveal rounded-xl border bg-muted object-cover transition-colors"
          priority={index <= 1}
          placeholder="blur"
          blurDataURL={post.image}
        />
      </div>

      <div className="mt-2 flex h-full w-full flex-col gap-2">
        <h2 className="line-clamp-2 text-2xl font-extrabold">{post.title}</h2>
        {post.description && (
          <p className="line-clamp-3 text-muted-foreground sm:line-clamp-2 md:line-clamp-4">
            {post.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-sm text-muted-foreground">
          {post.date && <span>{formatDate(post.date)}</span>}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <EyeIcon className="size-4" />
              <span>
                {viewQuery.isLoading ? "--" : viewQuery.data?.views} views
              </span>
            </div>

            <div className="flex items-center gap-1">
              <ThumbsUpIcon className="size-4" />
              <span>
                {likeQuery.isLoading ? "--" : likeQuery.data?.likes} likes
              </span>
            </div>
          </div>
        </div>
      </div>

      <Link href={post.slug} className="absolute inset-0">
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  )
}

export default PostCard
