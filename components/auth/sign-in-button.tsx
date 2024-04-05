"use client"

import { useSignInModal } from "@/hooks/use-sign-in-modal"
import { Button } from "@/components/ui/button"

export default function SignInButton() {
  const { setOpen } = useSignInModal()
  return (
    <>
      <Button onClick={() => setOpen(true)} type="button">
        Login
      </Button>
      <span className="ml-2">to continue leaving a message</span>
    </>
  )
}
