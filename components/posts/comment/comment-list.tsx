"use client"

import { useCommentsContext } from "@/contexts/comments"
import { api } from "@/trpc/react"
import { Loader2Icon } from "lucide-react"

import { useCommentHighlighter } from "@/hooks/use-comment-highlighter"
import CommentItem from "@/components/posts/comment/comment-item"

export default function CommentList() {
  const { slug } = useCommentsContext()

  const { data: comments, isLoading } = api.comment.getAll.useQuery({ slug })

  useCommentHighlighter(comments)

  return (
    <div className="space-y-2 rounded-lg border py-2 dark:bg-zinc-900/30">
      {isLoading ? (
        <div className="flex min-h-20 items-center justify-center">
          <Loader2Icon className="size-7 animate-spin" />
        </div>
      ) : (
        comments
          ?.filter((c) => !c.parentId)
          .map((comment) => <CommentItem key={comment.id} comment={comment} />)
      )}

      {comments?.length === 0 ? (
        <div className="flex min-h-20 items-center justify-center">
          <p className="text-sm text-muted-foreground">No comments</p>
        </div>
      ) : null}
    </div>
  )
}
