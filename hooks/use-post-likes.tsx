import { useDebounce } from "react-use"
import useSWR, { SWRConfiguration } from "swr"

const API_URL = `/api/likes`

type MetricsPayload = {
  likes: number
  currentUserLikes: number
}

async function getPostLikes(slug: string): Promise<MetricsPayload> {
  const res = await fetch(API_URL + `/${slug}`)
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.")
  }
  return res.json()
}

export default function usePostLikes(slug: string, config?: SWRConfiguration) {
  const { data, error, mutate } = useSWR(
    [API_URL, slug],
    () => getPostLikes(slug),
    {
      deDupingInterval: 60000,
      ...config,
    }
  )

  return {
    likes: data?.likes,
  }
}
