"use client"

import { SendIcon } from "lucide-react"

import { useCurrentUser } from "@/hooks/use-current-user"
import { useSignInModal } from "@/hooks/use-sign-in-modal"
import { Button } from "@/components/ui/button"
import CommentEditor, {
  useCommentEditor,
} from "@/components/posts/comment-editor"

export default function CommentForm() {
  const [editor, setEditor] = useCommentEditor()
  const user = useCurrentUser()
  const { setOpen } = useSignInModal()

  const disabled = !user

  return (
    <form className="mt-6">
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
