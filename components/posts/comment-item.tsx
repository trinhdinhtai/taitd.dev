"use client"

import { useMemo, useState } from "react"
import { CommentContext, CommentProvider } from "@/contexts/comment"
import { useCommentsContext } from "@/contexts/comments"
import {
  CommentResponse,
  GetCommentsResponse,
} from "@/server/api/routers/comment"
import { PostComment, User } from "@prisma/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import CommentActions from "@/components/posts/comment-actions"
import CommentEditor, {
  useCommentEditor,
} from "@/components/posts/comment-editor"
import CommentMenu from "@/components/posts/comment-menu"
import CommentReply from "@/components/posts/comment-reply"
import Timestamp from "@/components/timestamp"

interface CommentItemProps {
  comment: CommentResponse
}

export default function CommentItem({ comment }: CommentItemProps) {
  const {
    user: { name, image },
    id,
    parentId,
    content,
    createdAt,
  } = comment

  const { slug } = useCommentsContext()
  const [editor, setEditor] = useCommentEditor()

  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isOpenReplies, setIsOpenReplies] = useState(false)

  const context = useMemo<CommentContext>(() => {
    return {
      isEditing,
      isReplying,
      isOpenReplies,
      setIsEditing,
      setIsReplying,
      setIsOpenReplies,
      slug,
      comment,
    }
  }, [comment, isEditing, isOpenReplies, isReplying, slug])

  return (
    <CommentProvider value={context}>
      <div
        className="overflow-hidden"
        id={parentId ? `comment-${parentId}-${id}` : `comment-${id}`}
      >
        <div className="flex gap-2 p-2 sm:px-4">
          <Avatar className="size-8">
            <AvatarImage src={image} />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="size-8 rounded-full" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <div className="font-semibold">{name}</div>

                <Timestamp datetime={createdAt.toString()} />
              </div>

              <CommentMenu comment={comment} />
            </div>

            <CommentEditor
              editor={editor}
              onChange={setEditor}
              // @ts-ignore
              content={content}
              editable={false}
            />

            {isReplying ? <CommentReply /> : <CommentActions />}
          </div>
        </div>
      </div>
    </CommentProvider>
  )
}
