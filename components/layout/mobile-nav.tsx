import { ReactNode } from "react"
import { NavItem } from "@/types"

interface MobileNavProps {
  children?: ReactNode
  items: NavItem[]
}

const MobileNav = ({ item, children }: MobileNavProps) => {
  return <div>MobileNav</div>
}

export default MobileNav
