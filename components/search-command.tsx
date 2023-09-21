"use client"

import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface SearchCommandProps extends React.HTMLAttributes<HTMLFormElement> {}

const SearchCommand = ({ className, ...props }: SearchCommandProps) => {
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    return toast.success("Not implemented")
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative w-full", className)}
      {...props}
    >
      <Input
        type="search"
        placeholder="Search blog..."
        className="h-8 w-full sm:w-64 sm:pr-12"
      />
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </form>
  )
}

export default SearchCommand
