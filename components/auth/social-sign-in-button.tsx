import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"

export default function SocialSignInButton() {
  const handleClick = (provider: "google" | "github") => {}
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
