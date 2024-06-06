"use client"

import { SendIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import CommentEditor, {
  useCommentEditor,
} from "@/components/posts/comment-editor"

export default function PostComment() {
  const [editor, setEditor] = useCommentEditor()

  const disabled = false

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
      </div>
    </form>
  )
}
