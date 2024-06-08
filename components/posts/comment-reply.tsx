import { FormEvent } from "react"
import { useCommentContext } from "@/contexts/comment"
import { useCommentsContext } from "@/contexts/comments"
import { api } from "@/trpc/react"
import { toast } from "sonner"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Button } from "@/components/ui/button"
import CommentEditor, {
  useCommentEditor,
} from "@/components/posts/comment-editor"

export default function CommentReply() {
  const { isAuthenticated } = useCurrentUser()
  const [editor, setEditor] = useCommentEditor()
  const { slug } = useCommentsContext()
  const { comment, setIsReplying } = useCommentContext()
  const utils = api.useUtils()

  const { mutate, isPending } = api.comment.create.useMutation({
    onSuccess: () => {
      editor?.clearValue()
      setIsReplying(false)
      toast.success("Comment posted")
    },
    onError: (error) => toast.error(error.message),
    onSettled: () => utils.comment.getAll.invalidate(),
  })

  const disabled = !isAuthenticated || isPending

  const handleReplySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!editor) return
    if (editor.isEmpty) {
      toast.error("Comment cannot be empty")

      return
    }

    const content = editor.getValue()

    mutate({
      slug,
      content,
      parentId: comment.id,
    })
  }

  return (
    <form onSubmit={handleReplySubmit}>
      <CommentEditor
        editor={editor}
        onChange={setEditor}
        placeholder={"Reply to comment"}
        disabled={disabled}
      />

      <div className="mt-2 space-x-1">
        <Button
          variant="secondary"
          className="h-8 px-2 text-xs font-medium"
          type="submit"
          disabled={disabled || !editor || editor.isEmpty}
          aria-disabled={disabled || !editor || editor.isEmpty}
        >
          Reply
        </Button>
        <Button
          variant="secondary"
          className="h-8 px-2 text-xs font-medium"
          type="button"
          onClick={() => setIsReplying(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
