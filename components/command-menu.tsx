"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import { CommandIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { navbarLinks } from "@/config/navbarLinks"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command"

export default function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="size-8 px-0"
        onClick={() => setOpen(true)}
        {...props}
      >
        <CommandIcon className="size-5" strokeWidth="1.5" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {navbarLinks.map((link) =>
              link.content ? (
                link.content.map((subLink) => (
                  <MenuCommandItem
                    key={subLink.href}
                    value={subLink.title}
                    onSelect={() => {
                      runCommand(() => router.push(subLink.href))
                    }}
                  />
                ))
              ) : (
                <MenuCommandItem
                  key={link.href}
                  value={link.title}
                  onSelect={() => {
                    runCommand(() => router.push(link?.href as string))
                  }}
                />
              )
            )}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Icons.sun className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Icons.moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Icons.laptop className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

interface MenuCommandProps {
  value: string
  onSelect?: (value: string) => void
}

const MenuCommandItem = ({ value, onSelect }: MenuCommandProps) => (
  <CommandItem value={value} onSelect={onSelect}>
    <Icons.file className="mr-2 h-4 w-4" />
    <span>{value}</span>
  </CommandItem>
)
