"use client"

import { useRef } from "react"
import { createMessage } from "@/actions/guestbook"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"

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
        <Textarea
          aria-label="Your message"
          placeholder="Your message ..."
          name="message"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => signOut()} type="button">
          Logout
        </Button>
        <Button type="submit" disabled={pending}>
          Submit
        </Button>
      </div>
    </form>
  )
}
