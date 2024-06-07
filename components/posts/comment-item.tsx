import Image from "next/image"
import { PostComment, User } from "@prisma/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import CommentEditor, {
  useCommentEditor,
} from "@/components/posts/comment-editor"
import Timestamp from "@/components/timestamp"

interface CommentItemProps {
  comment: PostComment & { user: User }
}

export default function CommentItem({ comment }: CommentItemProps) {
  const {
    user: { name, image },
    content,
    createdAt,
  } = comment

  const [editor, setEditor] = useCommentEditor()

  return (
    <div className="overflow-hidden">
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
          </div>

          <CommentEditor
            editor={editor}
            onChange={setEditor}
            // @ts-ignore
            content={content}
            editable={false}
          />
        </div>
      </div>
    </div>
  )
}
