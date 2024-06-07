"use client"

import { useCommentsContext } from "@/contexts/comments"
import { api } from "@/trpc/react"
import { Loader } from "lucide-react"

import CommentItem from "@/components/posts/comment-item"

export default function CommentList() {
  const { slug } = useCommentsContext()

  const { data: comments, isLoading } = api.comment.getAll.useQuery({ slug })

  return (
    <div className="space-y-2 rounded-lg border py-2 dark:bg-zinc-900/30">
      <div className="flex items-center justify-center">
        {isLoading ? <Loader className="size-4 animate-spin" /> : null}

        {!isLoading && !comments?.length ? (
          <p className="text-sm text-muted-foreground">No comments</p>
        ) : null}
      </div>

      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
