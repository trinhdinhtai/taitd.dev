import { notFound } from "next/navigation"

import {
  getBookmarksByCollectionId,
  getCollection,
  getCollections,
} from "@/lib/raindrop"
import BookmarkList from "@/components/bookmark-list"
import PageHeading from "@/components/page-heading"

interface BookmarkCollectionPageProps {
  params: {
    slug: string
  }
}

async function fetchData(slug: string) {
  const collections = await getCollections()
  if (!collections) return

  const currentCollection = collections.find(
    (collection: any) => collection.slug === slug
  )
  if (!currentCollection) return

  const [collection, bookmarks] = await Promise.all([
    getCollection(currentCollection._id),
    getBookmarksByCollectionId({
      collectionId: currentCollection._id,
    }),
  ])

  if (!collection || !bookmarks) return

  return { collection: collection.item, bookmarks }
}

export default async function BookmarkCollectionPage({
  params,
}: BookmarkCollectionPageProps) {
  const { slug } = params
  const response = await fetchData(slug)

  if (!response) return notFound()

  const { collection, bookmarks } = response

  return (
    <>
      <PageHeading
        title={collection.title}
        description={collection.description}
      />

      <BookmarkList id={collection._id} initialBookmarks={bookmarks} />
    </>
  )
}
