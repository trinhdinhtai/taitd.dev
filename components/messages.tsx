import { ExtendedUser } from "@/nextauth"
import { Guestbook, User } from "@prisma/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface MessageProps {
  user?: ExtendedUser
  messages: (Guestbook & { user: User })[]
}
export default function Messages({ user, messages }: MessageProps) {
  return (
    <div className="mt-10 flex flex-col gap-4">
      {messages.map(({ id, message, user, createdAt }) => (
        <div key={id} className="rounded-lg border p-4">
          <div className="mb-3 flex gap-3">
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

            <div className="flex flex-col justify-center gap-px text-sm">
              <div>{user.name}</div>
              <div>{createdAt.toLocaleDateString()}</div>
            </div>
          </div>
          <div className="break-words pl-[52px]">{message}</div>
        </div>
      ))}
    </div>
  )
}
