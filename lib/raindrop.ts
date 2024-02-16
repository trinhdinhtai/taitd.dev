import { BOOKMARK_COLLECTION_IDS } from "@/constants/raindrop-collection"

const RAINDROP_API_URL = "https://api.raindrop.io/rest/v1"

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN}`,
  },
  next: { revalidate: 0 },
}

export async function getCollections() {
  try {
    const response = await fetch(`${RAINDROP_API_URL}/collections`, options)
    const collections = await response.json()
    const filteredCollections = collections.items.filter((collection: any) =>
      BOOKMARK_COLLECTION_IDS.includes(collection._id)
    )
    return filteredCollections
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getCollection(id: string) {
  try {
    const response = await fetch(
      `${RAINDROP_API_URL}/collection/${id}`,
      options
    )
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}
