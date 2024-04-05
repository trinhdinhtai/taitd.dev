"use client"

import { useSignInModal } from "@/hooks/use-sign-in-modal"
import { Button } from "@/components/ui/button"

export default function SignInButton() {
  const { setOpen } = useSignInModal()
  return (
    <>
      <Button
        className="inline-block bg-gradient-to-br from-[#fcd34d] via-[#ef4444] to-[#ec4899] font-extrabold text-foreground"
        onClick={() => setOpen(true)}
        type="button"
      >
        Login
      </Button>
      <span className="ml-2">to continue leaving a message</span>
    </>
  )
}
