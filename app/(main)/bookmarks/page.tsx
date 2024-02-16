import { Metadata } from "next"

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
      <p>Test Cache</p>
      <PageHeading
        title="Bookmarks"
        description="My collection of bookmarks."
      />
      <ScrollArea className="flex flex-col lg:hidden">
        <div>
          {collections.map((collection) => (
            <div
              key={collection._id}
              className="rounded-lg bg-white p-4 shadow"
            >
              <h2 className="text-lg font-semibold">{collection.title}</h2>
              <span className="text-muted-foreground">
                {collection.count} bookmarks
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
