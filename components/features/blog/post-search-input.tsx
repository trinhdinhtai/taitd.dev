"use client"

import { useEffect } from "react"
import { XIcon } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"

import { useSearchQuery } from "@/hooks/use-search-query"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "@/components/icons"

export function PostSearchInput() {
  const { query, setQuery } = useSearchQuery()

  useHotkeys("esc", () => setQuery(null), { enableOnFormTags: true })

  useEffect(() => {
    if (query && query.length >= 2) {
      const timeoutId = setTimeout(() => {}, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [query])

  return (
    <InputGroup className="rounded-lg shadow-none">
      <InputGroupInput
        placeholder="Search blog…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />

      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>

      <InputGroupAddon
        className="pr-2.25 data-[disabled=true]:hidden"
        align="inline-end"
        data-disabled={!query.length}
      >
        <InputGroupButton
          className="rounded-sm border-none"
          size="icon-xs"
          title="Clear"
          aria-label="Clear"
          onClick={() => setQuery(null)}
        >
          <XIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
