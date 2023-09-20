"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { AVATAR_URL } from "@/config/data"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const Intro = () => {
  return (
    <section className="flex min-h-[calc(100vh-80px)] max-w-[50rem] scroll-mt-[100rem] flex-col justify-center space-y-4 text-center sm:mb-0">
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src={AVATAR_URL}
              alt="Trịnh Đình Tài"
              width="320"
              height="320"
              quality="95"
              priority={true}
              className="h-56 w-56 rounded-full border-[0.35rem] border-secondary object-cover shadow-xl saturate-0 filter sm:h-80 sm:w-80"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="mb-10 mt-4 flex flex-col gap-y-4 px-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-2xl font-bold leading-[1.5] sm:text-4xl lg:text-6xl">
          {"Hi, I'm Tài."}
        </span>
        <span className="text-xl font-semibold text-muted-foreground">
          React developer
        </span>
        <span className="text-muted-foreground">
          I enjoy building sites & apps. My focus is React (Next.js).
        </span>
      </motion.div>

      <motion.div
        className="flex flex-col items-center justify-center gap-2 px-4 text-lg font-medium sm:flex-row"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className={cn(buttonVariants({ variant: "default" }), "group")}
        >
          Contact me
          <Icons.arrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
        </Link>

        <Link
          href="/CV.pdf"
          download
          className={cn(buttonVariants({ variant: "outline" }), "group")}
        >
          My Resume
          <Icons.download className="ml-2 h-4 w-4 transition group-hover:translate-y-1" />
        </Link>
      </motion.div>
    </section>
  )
}

export default Intro
