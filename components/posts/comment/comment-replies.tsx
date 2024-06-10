import { useCommentContext } from "@/contexts/comment"
import { useCommentsContext } from "@/contexts/comments"
import { api } from "@/trpc/react"
import { Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import CommentItem from "@/components/posts/comment/comment-item"

export default function CommentReplies() {
  const { comment, isOpenReplies, setIsOpenReplies } = useCommentContext()
  const { slug } = useCommentsContext()

  const { data: comments, isLoading } = api.comment.getAll.useQuery(
    {
      slug,
      parentId: comment.id,
    },
    {
      enabled: isOpenReplies,
    }
  )

  return (
    <div>
      {isOpenReplies && !isLoading ? (
        comments?.map((reply) => <CommentItem key={reply.id} comment={reply} />)
      ) : (
        <Button
          variant="link"
          className="px-0"
          onClick={() => setIsOpenReplies(true)}
          type="button"
        >
          Show all {comment.repliesCount} replies
          {isLoading ? (
            <Loader2Icon className="ml-2 size-3 animate-spin" />
          ) : null}
        </Button>
      )}
    </div>
  )
}
