"use client"

import Image from "next/image"
import Link from "next/link"
import { Post } from "@/.contentlayer/generated"
import { getPostMetrics } from "@/server/actions/blog"
import { useQuery } from "@tanstack/react-query"

import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: Post
  index: number
}

const PostCard = ({ post, index }: PostCardProps) => {
  const { data: postMetric, isPending } = useQuery({
    queryKey: ["get-post-views", post.slugAsParams],
    queryFn: async () => await getPostMetrics(post.slugAsParams),
    retry: true,
    retryDelay: 500,
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

        <div className="mt-auto flex items-center justify-between gap-2 px-2 pt-4 text-sm text-muted-foreground">
          {post.date && <span>{formatDate(post.date)}</span>}

          <div className="flex gap-2">
            {isPending ? "--" : <div>{postMetric?.views} views</div>}
            <div>&middot;</div>
            {isPending ? "--" : <div>{postMetric?.likes} likes</div>}
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
