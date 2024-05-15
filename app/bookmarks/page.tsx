import { Metadata } from "next"
import Link from "next/link"

import { getCollections } from "@/lib/raindrop"
import { sortByProperty } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import PageHeading from "@/components/page-heading"

export const metadata: Metadata = {
  title: "Bookmarks",
}

async function fetchData() {
  const collections = await getCollections()
  if (!collections) return { collections: [] }

  const sortedCollections = sortByProperty(collections, "title")
  return { collections: sortedCollections }
}

export default async function BookmarkPage() {
  const { collections } = await fetchData()

  return (
    <>
      <PageHeading
        title="Bookmarks"
        description="Discoveries from the World Wide Web"
      />

      <ScrollArea>
        <div className="divide-y">
          {collections.map((collection) => (
            <Link
              key={collection._id}
              href={`/bookmarks/${collection.slug}`}
              className="flex flex-col gap-1 px-2 py-3 text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <div>
                <h2 className="text-lg font-semibold">{collection.title}</h2>
                <span className="text-muted-foreground">
                  {collection.count} bookmarks
                </span>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
