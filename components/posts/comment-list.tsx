import { useCommentsContext } from "@/contexts/comments"
import { api } from "@/trpc/react"

export default function CommentList() {
  const { slug } = useCommentsContext()

  return <div>CommentList</div>
}
