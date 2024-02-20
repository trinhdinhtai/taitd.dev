"use client"

import { useEffect, useState } from "react"
import { PAGE_SIZE } from "@/constants/raindrop-collection"
import { Bookmark } from "@/types"
import { Loader } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { getBookmarksByCollectionId } from "@/lib/raindrop"
import BookmarkCard from "@/components/bookmark-card"

let pageIndex = 1

interface LoadMoreProps {
  id: string
}

export default function LoadMore({ id }: LoadMoreProps) {
  const { ref, inView } = useInView()

  const [data, setData] = useState<Bookmark[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isReachingEnd, setIsReachingEnd] = useState(false)

  const isInfiniteScrollEnabled = inView && isLoading && !isReachingEnd

  useEffect(() => {
    if (inView && !isReachingEnd) {
      setIsLoading(true)

      const delay = 500

      const timeoutId = setTimeout(async () => {
        const newBookmarks = await getBookmarksByCollectionId({
          collectionId: id,
          pageIndex,
        })

        if (PAGE_SIZE > newBookmarks.length) setIsReachingEnd(true)

        setData((prev) => [...prev, ...newBookmarks])
        pageIndex++
        setIsLoading(false)
      }, delay)

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId)
    }
  }, [inView, id, isReachingEnd])

  return (
    <>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {data.map((bookmark) => (
          <BookmarkCard key={bookmark._id} bookmark={bookmark} />
        ))}
      </div>

      <section className="mt-4 flex w-full items-center justify-center">
        <div ref={ref}>
          {isInfiniteScrollEnabled ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            <span>{`That's all for now. Come back later for more.`}</span>
          )}
        </div>
      </section>
    </>
  )
}
