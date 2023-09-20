import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"

import { Callout } from "@/components/callout"

const components = {
  Image,
  Callout,
}

interface MdxProps {
  code: string
}

const Mdx = ({ code }: MdxProps) => {
  const Component = useMDXComponent(code)
  return (
    <div>
      <Component components={components} />
    </div>
  )
}

export default Mdx
