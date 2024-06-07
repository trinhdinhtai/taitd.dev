import Image from "next/image"
import { PostComment, User } from "@prisma/client"

interface CommentItemProps {
  comment: PostComment & { user: User }
}

export default function CommentItem({ comment }: CommentItemProps) {
  const {
    user: { name, image },
    content,
    createdAt,
  } = comment

  return (
    <div className="overflow-hidden">
      <div className="flex gap-2 p-2 sm:px-4">
        <Image
          src={image || ""}
          alt={name || "User profile picture"}
          width={32}
          height={32}
          className="z-10 size-8 rounded-full"
        />
      </div>
    </div>
  )
}
