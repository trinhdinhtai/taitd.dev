"use client"

import Link from "next/link"

import { useSignInModal } from "@/hooks/use-sign-in-modal"
import { Button } from "@/components/ui/button"

export default function SignInButton() {
  const { setOpen } = useSignInModal()
  return (
    <>
      Please{" "}
      <Button
        variant="link"
        onClick={() => setOpen(true)}
        className="px-0 text-base underline"
      >
        login
      </Button>
      <span className="ml-2">to continue leaving a message</span>
    </>
  )
}
