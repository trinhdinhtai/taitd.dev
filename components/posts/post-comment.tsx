import CommentForm from "@/components/posts/comment-form"
import CommentList from "@/components/posts/comment-list"

export default function PostComment() {
  return (
    <div className="space-y-6">
      <CommentForm />
      <CommentList />
    </div>
  )
}
