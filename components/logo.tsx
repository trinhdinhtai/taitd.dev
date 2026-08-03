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
        className="absolute -top-10 -right-8"
      />
      <span className="font-mono text-lg font-semibold lowercase">{`${siteConfig.name}.dev()`}</span>
    </Link>
  )
}

export default Logo
