import { getCollection, getCollections } from "@/lib/raindrop"
import { ScrollArea } from "@/components/ui/scroll-area"
import PageHeading from "@/components/page-heading"

interface BookmarkCollectionPageProps {
  params: {
    slug: string
  }
}

async function fetchData(slug: string) {
  const collections = await getCollections()
  const currentCollection = collections.find(
    (collection: any) => collection.slug === slug
  )

  const collection = await getCollection(currentCollection._id)
  if (!collection) return { collection: null }

  return { collection: collection.item }
}

export default async function BookmarkCollectionPage({
  params,
}: BookmarkCollectionPageProps) {
  const { slug } = params
  const { collection } = await fetchData(slug)

  return (
    <>
      <PageHeading
        title={collection.title}
        description={collection.description}
      />
    </>
  )
}
