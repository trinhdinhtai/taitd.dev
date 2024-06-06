"use client"

import { useEffect, useState } from "react"
import { Bold } from "@tiptap/extension-bold"
import { Document } from "@tiptap/extension-document"
import { Italic } from "@tiptap/extension-italic"
import { Paragraph } from "@tiptap/extension-paragraph"
import { Placeholder } from "@tiptap/extension-placeholder"
import { Strike } from "@tiptap/extension-strike"
import { Text } from "@tiptap/extension-text"
import { Editor, EditorContent, type JSONContent } from "@tiptap/react"

import { cn } from "@/lib/utils"
import EditorToolbar from "@/components/posts/editor-toolbar"

interface CommentEditorProps {
  editor: UseCommentEditor | null
  placeholder?: string
  autofocus?: boolean
  editable?: boolean
  disabled?: boolean
  content?: JSONContent
  onChange?: (editor: UseCommentEditor) => void
}

interface UseCommentEditor {
  editor: Editor
  isEmpty: boolean
  getValue: () => JSONContent
  clearValue: () => void
}

export const useCommentEditor = (): [
  editor: UseCommentEditor | null,
  setEditor: (editor: UseCommentEditor) => void,
] => {
  return useState<UseCommentEditor | null>(null)
}

const createCommentEditor = (editor: Editor): UseCommentEditor => {
  return {
    editor,
    isEmpty: editor.isEmpty,
    getValue() {
      return editor.getJSON()
    },
    clearValue() {
      editor.commands.clearContent(true)
    },
  }
}

export default function CommentEditor({
  editor,
  placeholder,
  content,
  onChange,
  autofocus = false,
  editable = true,
  disabled = false,
}: CommentEditorProps) {
  const innerEditor = editor?.editor ?? null

  const editorClassName = cn(
    "rounded-lg border bg-background pb-1 ring-offset-background",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
    "aria-disabled:cursor-not-allowed aria-disabled:opacity-80"
  )

  const tiptapClassName = cn(
    "focus-visible:outline-none",
    editable && "min-h-10 px-3 py-2"
  )

  useEffect(() => {
    const instance = new Editor({
      extensions: [
        Bold,
        Document,
        Italic,
        Paragraph,
        Strike,
        Text,
        Placeholder.configure({
          placeholder,
          showOnlyWhenEditable: false,
        }),
      ],
      autofocus,
      content,
      editorProps: {
        attributes: {
          class: tiptapClassName,
        },
      },
      editable,
      onTransaction: () => {
        onChange?.(createCommentEditor(instance))
      },
    })

    onChange?.(createCommentEditor(instance))

    return () => {
      instance.destroy()
    }
  }, [autofocus, content, editable, onChange, placeholder, tiptapClassName])

  if (!innerEditor) {
    return (
      <div aria-disabled className={editorClassName}>
        <div className={cn("tiptap", tiptapClassName)}>
          <p className="is-editor-empty" data-placeholder={placeholder} />
        </div>
      </div>
    )
  }

  if (!editable) {
    return <EditorContent editor={innerEditor} />
  }

  innerEditor.setEditable(!disabled)

  return (
    <div
      aria-disabled={disabled}
      className={editorClassName}
      onMouseUp={() => {
        innerEditor?.commands.focus()
      }}
    >
      <EditorContent editor={innerEditor} />
      <EditorToolbar editor={innerEditor} />
    </div>
  )
}
