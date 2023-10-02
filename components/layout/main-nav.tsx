"use client"

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
  useState,
} from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { navbarLinks } from "@/config/navbarLinks"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import SearchCommand from "@/components/search-command"
import { ModeToggle } from "@/components/theme-toggle"

import { Icons } from "../icons"
import MobileNav from "./mobile-nav"

interface MainNavbarProps {
  children?: ReactNode
}

const MainNavbar = ({ children }: MainNavbarProps) => {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  return (
    <div className="flex flex-1 justify-end gap-6 md:gap-10 lg:justify-between">
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          {navbarLinks.map((link) => (
            <NavigationMenuItem key={link.title.trim()}>
              {link.content ? (
                <>
                  <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {link.content.map((subItem) => (
                        <ListItem
                          key={subItem.href.trim()}
                          title={subItem.title}
                          href={subItem.href}
                          target={
                            subItem.href.startsWith("http") ? "_blank" : "_self"
                          }
                        >
                          {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={link.href as string} legacyBehavior passHref>
                  <NavigationMenuLink
                    target={link?.href?.startsWith("http") ? "_blank" : "_self"}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      link?.href?.startsWith(`/${segment}`) &&
                        "bg-accent font-semibold",
                      link.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {link.title}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden items-center gap-4 lg:flex">
        <div className="flex-1 sm:grow-0">
          <SearchCommand />
        </div>
        <ModeToggle />
      </div>

      <button
        className="flex items-center space-x-2 lg:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
      </button>

      {showMobileMenu && navbarLinks && (
        <MobileNav items={navbarLinks}>{children}</MobileNav>
      )}
    </div>
  )
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          {/* TODO: Figure out how to type this */}
          {/* @ts-expect-error */}
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

export default MainNavbar
