import { Metadata } from "next"

import { getCollections } from "@/lib/raindrop"
import { sortByProperty } from "@/lib/utils"
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
    </>
  )
}
