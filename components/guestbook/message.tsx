"use client"

import { Guestbook, User } from "@prisma/client"

import { siteConfig } from "@/config/site"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import DeleteMessageButton from "@/components/guestbook/delete-message-button"
import Timestamp from "@/components/timestamp"

interface MessageProps {
  message: Guestbook & { user: User }
}

export default function Message({ message }: MessageProps) {
  const { id, message: body, user, createdAt } = message

  const isAuthor = user.email === siteConfig.author.email
  const currentUser = useCurrentUser()

  return (
    <div className="flex gap-3 px-3 text-sm">
      <Avatar>
        <AvatarImage
          src={user.image as string}
          width={40}
          height={40}
          className="size-10 rounded-full"
          alt={user.name as string}
        />
        <AvatarFallback className="bg-transparent">
          <Skeleton className="size-10 rounded-full" />
        </AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div>{user.name}</div>
          {isAuthor && (
            <div
              className={
                "rounded-full bg-primary/10 px-1.5 py-0.5 text-xs text-primary dark:bg-primary/20"
              }
            >
              Author
            </div>
          )}
          <Timestamp datetime={createdAt.toString()} />
        </div>
        <div className="group flex min-h-8 items-center gap-4">
          <div className="break-words">{body}</div>
          {currentUser?.id === user.id && (
            <DeleteMessageButton messageId={id} />
          )}
        </div>
      </div>
    </div>
  )
}
