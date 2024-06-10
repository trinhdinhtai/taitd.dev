"use client"

import { useCommentContext } from "@/contexts/comment"
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Button } from "@/components/ui/button"

export default function CommentActions() {
  const { comment, setIsReplying } = useCommentContext()
  const { isAuthenticated } = useCurrentUser()

  return (
    <div className="flex gap-1">
      <Button
        variant="secondary"
        size="sm"
        disabled={!isAuthenticated}
        className="gap-1"
      >
        <ThumbsUpIcon className="size-4" />
        {comment.likesCount}
      </Button>

      <Button
        variant="secondary"
        size="sm"
        disabled={!isAuthenticated}
        className="gap-1"
      >
        <ThumbsDownIcon className="size-4" />
        {comment.dislikesCount}
      </Button>

      {!comment.parentId && isAuthenticated ? (
        <Button
          size="sm"
          variant="secondary"
          className="text-xs font-medium text-muted-foreground"
          onClick={() => setIsReplying(true)}
        >
          Reply
        </Button>
      ) : null}
    </div>
  )
}
