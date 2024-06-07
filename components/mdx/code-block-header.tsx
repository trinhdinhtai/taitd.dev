"use client"

import { HTMLAttributes } from "react"
import { IconType } from "react-icons"
import { AiOutlineFileText, AiOutlineFolderOpen } from "react-icons/ai"
import { BsFileEarmarkCodeFill } from "react-icons/bs"
import { IoLogoJavascript } from "react-icons/io5"
import {
  SiCss3,
  SiGnubash,
  SiHtml5,
  SiMarkdown,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiTypescript,
  SiVercel,
} from "react-icons/si"
import { VscJson } from "react-icons/vsc"

import { cn } from "@/lib/utils"

type CodeBlockProps = HTMLAttributes<HTMLElement> & {
  title?: string
  ["data-language"]?: string
}

export default function CodeBlockHeader({
  title,
  className,
  children,
  ...props
}: Readonly<CodeBlockProps>) {
  const language = props["data-language"]

  let Icon: IconType
  switch (language) {
    case "html":
      Icon = SiHtml5
      break
    case "css":
      Icon = SiCss3
      break
    case "js":
      Icon = IoLogoJavascript
      break
    case "bash":
      Icon = SiGnubash
      break
    case "py":
      Icon = SiPython
      break
    case "json":
      Icon = VscJson
      break
    case "jsx":
      Icon = SiReact
      break
    case "text":
      Icon = AiOutlineFileText
      break
    case "md":
      Icon = SiMarkdown
      break
    case "next":
      Icon = SiNextdotjs
      break
    case "directory":
      Icon = AiOutlineFolderOpen
      break
    case "vercel":
      Icon = SiVercel
      break
    case "ts":
    case "tsx":
      Icon = SiTypescript
      break
    default:
      Icon = BsFileEarmarkCodeFill
      break
  }

  return (
    <figcaption
      className={cn(
        "flex items-center gap-1.5 rounded-t-lg border-b bg-[#FAFAFA] px-4 py-2 text-sm dark:bg-background",
        className
      )}
      {...props}
    >
      <Icon className="size-4" />
      {children}
    </figcaption>
  )
}
