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
        {comment.likes}
      </Button>

      <Button
        variant="secondary"
        size="sm"
        disabled={!isAuthenticated}
        className="gap-1"
      >
        <ThumbsDownIcon className="size-4" />
        {comment.dislikes}
      </Button>
    </div>
  )
}
