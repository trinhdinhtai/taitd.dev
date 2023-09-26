import Link from "next/link"

import { siteConfig } from "@/config/site"

import { Icons } from "./icons"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Icons.logo />
      <span className="font-mono font-bold lowercase">{`${siteConfig.name}.dev()`}</span>
    </Link>
  )
}

export default Logo
