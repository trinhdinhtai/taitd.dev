"use client"

import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"

export default function SocialSignInButton() {
  const handleClick = (provider: "google" | "github") => {
    signIn(provider)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        size="lg"
        className="flex w-full gap-2"
        variant="outline"
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="size-5" />
        Continue with Google
      </Button>

      <Button
        size="lg"
        className="flex w-full gap-2"
        variant="outline"
        onClick={() => handleClick("github")}
      >
        <FaGithub className="size-5" />
        Continue with Github
      </Button>
    </div>
  )
}
