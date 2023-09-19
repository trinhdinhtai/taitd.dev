import Link from "next/link"

import { siteConfig } from "@/config/site"

import { Icons } from "./icons"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Icons.logo />
      <span className="font-bold">{siteConfig.name}</span>
    </Link>
  )
}

export default Logo
