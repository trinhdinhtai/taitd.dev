"use client"

import { FormEvent } from "react"
import { useCommentsContext } from "@/contexts/comments"
import { api } from "@/trpc/react"
import { SendIcon } from "lucide-react"
import { toast } from "sonner"

import { useCurrentUser } from "@/hooks/use-current-user"
import { useSignInModal } from "@/hooks/use-sign-in-modal"
import { Button } from "@/components/ui/button"
import CommentEditor, {
  useCommentEditor,
} from "@/components/posts/comment-editor"

export default function CommentForm() {
  const { slug } = useCommentsContext()
  const [editor, setEditor] = useCommentEditor()
  const utils = api.useUtils()

  const user = useCurrentUser()
  const { setOpen } = useSignInModal()

  const disabled = !user

  const commentMutation = api.comment.create.useMutation({
    onSuccess: () => {
      editor?.clearValue()
      toast.success("Comment posted")
    },
    onError: (error) => toast.error(error.message),
    onSettled: () => utils.comment.getAll.invalidate(),
  })

  const handlePostComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!editor) return
    if (editor.isEmpty) {
      toast.error("Comment cannot be empty")

      return
    }

    const content = editor.getValue()

    commentMutation.mutate({
      slug,
      content,
    })
  }

  return (
    <form className="mt-6" onSubmit={handlePostComment}>
      <div className="relative">
        <CommentEditor
          editor={editor}
          onChange={setEditor}
          placeholder={"Leave comment"}
          disabled={disabled}
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-1.5 right-2 size-7"
          type="submit"
          disabled={disabled || !editor || editor.isEmpty}
          aria-label="Send comment"
          aria-disabled={disabled || !editor || editor.isEmpty}
        >
          <SendIcon className="size-4" />
        </Button>

        {!user ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]">
            <Button type="button" onClick={() => setOpen(true)}>
              Please sign in to comment
            </Button>
          </div>
        ) : null}
      </div>
    </form>
  )
}
