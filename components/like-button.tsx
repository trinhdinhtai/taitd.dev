"use client"

import { useState } from "react"
import { HeartIcon } from "@heroicons/react/24/solid"

import { cn } from "@/lib/utils"

interface LikeButtonProps {
  slug: string
}

const emojis = ["👍", "🙏", "🥰"]

const LikeButton = ({ slug }: LikeButtonProps) => {
  const currentUserLikes = 1

  const [animatedEmojis, setAnimatedEmojis] = useState<string[]>(
    currentUserLikes ? [emojis[currentUserLikes]] : []
  )

  const handleClick = () => {
    if (currentUserLikes && currentUserLikes <= 2) {
      setAnimatedEmojis([...animatedEmojis, emojis[currentUserLikes]])
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        {animatedEmojis.map((emoji) => (
          <div
            key={emoji}
            className="absolute w-full animate-[emoji_0.75s_ease-out] text-center opacity-0"
          >
            {emoji}
          </div>
        ))}

        <button
          className={cn(
            "group block transform overflow-hidden rounded-lg bg-gradient-to-tl from-black/80 to-black/10 p-1 shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:rounded-[10px] focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 active:scale-100 active:rounded-lg dark:from-white/5 dark:to-white/30"
            // currentUserLikes === 0
            //   ? "hover:shadow-gray-500/30"
            //   : "hover:shadow-red-500/50"
          )}
          onClick={handleClick}
        >
          <HeartIcon className="relative w-5 transform text-rose-100 transition duration-500 delay-100 ease-out group-hover:scale-110" />
        </button>
      </div>

      {/* Like counter text */}
      <div className="text-lg font-medium leading-none text-muted-foreground">
        1530
      </div>
    </div>
  )
}

export default LikeButton
