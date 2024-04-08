import { ExtendedUser } from "@/nextauth"
import { Guestbook, User } from "@prisma/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import Message from "@/components/guestbook/message"

interface MessageProps {
  user?: ExtendedUser
  messages: (Guestbook & { user: User })[]
}
export default function Messages({ user, messages }: MessageProps) {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}
