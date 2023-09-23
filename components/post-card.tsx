import Image from "next/image"
import Link from "next/link"
import { Post } from "@/.contentlayer/generated"

import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: Post
  index: number
}

const PostCard = ({ post, index }: PostCardProps) => {
  return (
    <article className="group relative flex flex-col space-y-2 rounded-2xl border p-3">
      <div className="w-full">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            className="my-auto rounded-xl border bg-muted object-cover transition-colors"
            priority={index <= 1}
          />
        )}
      </div>

      <div className="mt-2 flex h-full w-full flex-col gap-2">
        <h2 className="line-clamp-2 text-2xl font-extrabold">{post.title}</h2>
        {post.description && (
          <p className="line-clamp-3 text-muted-foreground sm:line-clamp-2 md:line-clamp-4">
            {post.description}
          </p>
        )}
        <div className="mt-auto">
          {post.date && (
            <p className="text-sm text-muted-foreground">
              {formatDate(post.date)}
            </p>
          )}
        </div>
      </div>

      <Link href={post.slug} className="absolute inset-0">
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  )
}

export default PostCard
