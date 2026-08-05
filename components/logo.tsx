import Image from "next/image"
import Link from "next/link"

import { LogoMark } from "./LogoMark"

const Logo = () => {
  return (
    <Link href="/" className="relative flex items-center">
      <Image
        width={90}
        height={90}
        alt="logo"
        src="/images/Bongo-Cat.png"
        className="absolute -top-8 -right-7 rotate-12"
      />
      <LogoMark className="h-7" />
    </Link>
  )
}

export default Logo
