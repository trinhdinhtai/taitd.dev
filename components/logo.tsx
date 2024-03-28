import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"

const Logo = () => {
  return (
    <Link href="/" className="relative flex items-center">
      <Image
        width={90}
        height={90}
        alt="logo"
        src="/images/Bongo-Cat.png"
        className="absolute -right-8 -top-10"
      />
      <span className="font-mono text-lg font-bold lowercase">{`${siteConfig.name}.dev()`}</span>
    </Link>
  )
}

export default Logo
