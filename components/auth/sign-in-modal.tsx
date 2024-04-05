"use client"

import { SiGithub, SiGoogle } from "react-icons/si"

import { useSignInModal } from "@/hooks/use-sign-in-modal"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import SocialSignInButton from "@/components/auth/social-sign-in-button"

export default function SignInModal() {
  const { open, setOpen } = useSignInModal()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left text-2xl">Sign in</DialogTitle>
          <DialogDescription className="text-left">
            to continue to taitd.io.vn
          </DialogDescription>
        </DialogHeader>

        <SocialSignInButton />
      </DialogContent>
    </Dialog>
  )
}
