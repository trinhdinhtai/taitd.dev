"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { NavItem } from "@/types"

import { cn } from "@/lib/utils"
import Logo from "@/components/logo"
import SearchCommand from "@/components/search-command"
import { ModeToggle } from "@/components/theme-toggle"

import { Icons } from "../icons"
import MobileNav from "./mobile-nav"

interface MainNavbarProps {
  children?: ReactNode
  items?: NavItem[]
}

const MainNavbar = ({ children, items }: MainNavbarProps) => {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  return (
    <div className="flex flex-1 justify-end gap-6 md:justify-between md:gap-10">
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center font-medium transition-colors hover:text-foreground/80",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}

      <div className="hidden items-center gap-4 md:flex">
        <div className="flex-1 sm:grow-0">
          <SearchCommand />
        </div>
        <ModeToggle />
      </div>

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
      </button>

      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  )
}

export default MainNavbar
