"use client"

import { useRef } from "react"
import { createMessage } from "@/actions/guestbook"
import { SendHorizonal } from "lucide-react"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

interface MessageFormProps {
  user: User
}

export default function MessageForm({ user }: MessageFormProps) {
  const { pending } = useFormStatus()
  const formRef = useRef<HTMLFormElement>(null)

  const createMessageHandler = async (formData: FormData) => {
    const toastId = toast.loading("Sending your message ...")
    const result = await createMessage(formData)
    toast.dismiss(toastId)

    if (result.error) {
      toast.error(result.message)
    } else {
      toast.success(result.message)
      formRef.current?.reset()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <p>
          You are currently logged in as{" "}
          <span className="font-semibold">{user.name}</span>
          <Button
            variant="link"
            onClick={() => signOut()}
            className="px-2 text-base underline"
          >
            logout
          </Button>
        </p>
      </div>
      <form action={createMessageHandler} ref={formRef}>
        <div className="mb-2 flex gap-3">
          <Avatar>
            <AvatarImage
              src={user.image as string}
              width={40}
              height={40}
              alt={user.name as string}
              className="size-10"
            />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="size-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div className="relative w-full">
            <Input
              aria-label="Your message"
              placeholder="Your message ..."
              name="message"
              required
              className="h-12 pr-20"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 gap-1"
              type="submit"
              disabled={pending}
            >
              Send
              <SendHorizonal className="size-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
