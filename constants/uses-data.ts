import { UseData } from "@/types"
import {
  BsFillPaletteFill,
  BsFillTerminalFill,
  BsGithub,
  BsWindows,
} from "react-icons/bs"
import { FaGitAlt, FaSearch } from "react-icons/fa"
import {
  SiBitwarden,
  SiCanva,
  SiFigma,
  SiGooglechrome,
  SiGrammarly,
  SiMicrosoftedge,
  SiNotepadplusplus,
  SiNotion,
  SiObsidian,
  SiPnpm,
  SiPostman,
  SiPrettier,
  SiSpotify,
  SiSublimetext,
  SiVercel,
  SiVisualstudiocode,
} from "react-icons/si"

import RainDrop from "@/components/app-icons/raindrop"

export const hardware = [
  {
    title: "MacBook Pro 14” (2021) M1 Pro 1TB (*)",
    description: `My main machine. I love it. I'm a huge believer of the 14" size. Small enough to travel with and big enough to work on.`,
    href: "https://amzn.to/42E6Sq9",
  },
  {
    title: "iPhone 13 Pro Max 256GB (*)",
    description: `My main phone. Camera is perfect for YouTube videos.`,
    href: "https://amzn.to/3JaQgzv",
  },
  {
    title: "Elgato Wave:3 Microphone (*)",
    description: `Perfect video and podcast microphone. Easy to use, small enough to travel with.`,
    href: "https://amzn.to/3J4XMvt",
  },
  {
    title: "Apple AirPods Max (*)",
    description: `Honestly, I hate the price, but I love the headphones. I use them for calls, music, and videos.`,
    href: "https://amzn.to/3X0PHxM",
  },
]

const software: UseData[] = [
  {
    name: "VSCode",
    description: "Primary Code editor",
    Icon: SiVisualstudiocode,
    link: "https://code.visualstudio.com/download",
  },
  {
    name: "Chrome",
    description: "Primary Browser",
    Icon: SiGooglechrome,
    link: "https://www.google.com/chrome",
  },
  {
    name: "Git",
    description: "Version Control",
    Icon: FaGitAlt,
    link: "https://git-scm.com/downloads",
  },
  {
    name: "Github Desktop",
    description: "To Manage the Github Project and Changes",
    Icon: BsGithub,
    link: "https://desktop.github.com/",
  },
  {
    name: "Oh-my-zsh",
    description: "Terminal Theme",
    Icon: BsFillTerminalFill,
    link: "https://ohmyz.sh/",
  },
  {
    name: "pnpm",
    description: "Primary Package Manager",
    Icon: SiPnpm,
    link: "https://pnpm.io/installation",
  },
  {
    name: "Bitwarden",
    description: "Password Manager to manage all the login",
    Icon: SiBitwarden,
    link: "https://bitwarden.com/",
  },
  {
    name: "Vercel",
    description: "Hosting for Projects",
    Icon: SiVercel,
    link: "http://vercel.com/",
  },
  {
    name: "Prettier",
    description: "For Code formatting",
    Icon: SiPrettier,
    link: "https://prettier.io/",
  },
  {
    name: "Figma",
    description: "Primary Design tool",
    Icon: SiFigma,
    link: "https://www.figma.com/downloads/",
  },
  {
    name: "Canva",
    description: "Secondary Design tool",
    Icon: SiCanva,
    link: "https://www.canva.com/",
  },
  {
    name: "Spotify",
    description: "To Listen Music",
    Icon: SiSpotify,
    link: "https://www.spotify.com/us/download/windows/",
  },
  {
    name: "Grammarly",
    description: "Typing assistant that reviews spelling, grammar, etc.",
    Icon: SiGrammarly,
    link: "https://www.grammarly.com/",
  },
  {
    name: "Everything",
    description: "For Quick searching in Windows",
    Icon: FaSearch,
    link: "https://www.voidtools.com/downloads/",
  },
  {
    name: "Raindrop.io",
    description: "Bookmark Manager",
    Icon: RainDrop,
    link: "https://raindrop.io/",
  },
  {
    name: "Postman",
    description: "API Testing",
    Icon: SiPostman,
    link: "https://postman.com",
  },
  {
    name: "Notion",
    description: "For Notes and Documentation",
    Icon: SiNotion,
    link: "https://www.notion.so",
  },
  {
    name: "Obsidian",
    description: "For Personal Knowledge Management",
    Icon: SiObsidian,
    link: "https://obsidian.md",
  },
  {
    name: "Notepad++",
    description: "Quick Code Editing",
    Icon: SiNotepadplusplus,
    link: "https://keep.google.com/",
  },
]

export { software }
