"use client"

import { Post } from "@/.contentlayer/generated"
import { api } from "@/trpc/react"
import { EyeIcon, MessageSquare, ThumbsUpIcon, TimerIcon } from "lucide-react"

interface PostMetricsProps {
  post: Post
}

const PostMetrics = ({ post }: PostMetricsProps) => {
  const utils = api.useUtils()

  const viewQuery = api.view.get.useQuery({
    slug: post.slugAsParams,
  })

  const likeQuery = api.like.get.useQuery({
    slug: post.slugAsParams,
  })

  const commentQuery = api.comment.getCount.useQuery({
    slug: post.slugAsParams,
  })

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <TimerIcon className="size-4" />
        <span>{post.readingTime} min read</span>
      </div>

      <div className="flex items-center gap-1">
        <EyeIcon className="size-4" />
        <span>{viewQuery.isLoading ? "--" : viewQuery.data?.views} views</span>
      </div>

      <div className="flex items-center gap-1">
        <ThumbsUpIcon className="size-4" />
        <span>{likeQuery.isLoading ? "--" : likeQuery.data?.likes} likes</span>
      </div>

      <div className="flex items-center gap-1">
        <MessageSquare className="size-4" />
        <span>
          {commentQuery.isLoading ? "--" : commentQuery.data} comments
        </span>
      </div>
    </div>
  )
}

export default PostMetrics
