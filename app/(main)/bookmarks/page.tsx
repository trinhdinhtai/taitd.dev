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
  const sortedCollections = sortByProperty(collections, "title")
  return { collections: sortedCollections }
}

export default async function BookmarkPage() {
  const { collections } = await fetchData()

  return (
    <>
      <PageHeading
        title="Bookmarks"
        description="My collection of bookmarks."
      />

      <ScrollArea className="h-[530px] md:h-[500px] lg:hidden">
        <div className="divide-y">
          {collections.map((collection) => (
            <Link
              key={collection._id}
              href={`/bookmarks/${collection.slug}`}
              className="flex flex-col gap-1 py-3 text-sm hover:bg-gray-100"
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
