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

        <div className="my-6 flex flex-col gap-4">
          <Button
            type="button"
            className="h-10 rounded-xl font-bold"
            onClick={() => {}}
          >
            <SiGithub className="mr-3" />
            Continue with GitHub
          </Button>

          <Button
            variant="ghost"
            type="button"
            className="h-10 rounded-xl font-bold"
            onClick={() => {}}
          >
            <SiGoogle className="mr-3" />
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
