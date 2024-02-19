"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Bookmark } from "@/types"
import { Loader } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { getBookmarksByCollectionId } from "@/lib/raindrop"
import { cn } from "@/lib/utils"
import BookmarkCard from "@/components/bookmark-card"

interface BookmarkListProps {
  id: string
  initialBookmarks: Bookmark[]
}

let pageIndex = 1

export default function BookmarkList({
  id,
  initialBookmarks,
}: BookmarkListProps) {
  const { ref, inView } = useInView()

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
  const [isLoading, setIsLoading] = useState(true)

  const getChunks = useCallback(() => {
    const firstChunk: any[] = []
    const lastChunk: any[] = []
    bookmarks.forEach((bookmark, index) => {
      if (index % 2 === 0) {
        firstChunk.push(bookmark)
      } else {
        lastChunk.push(bookmark)
      }
    })
    return [[...firstChunk], [...lastChunk]]
  }, [bookmarks])

  const chunks = useMemo(() => getChunks(), [getChunks])

  useEffect(() => {
    if (inView) {
      setIsLoading(true)

      const delay = 500

      const timeoutId = setTimeout(async () => {
        const newBookmarks = await getBookmarksByCollectionId({
          collectionId: id,
          pageIndex,
        })

        setBookmarks((prev) => [...prev, ...newBookmarks])
        setIsLoading(false)

        pageIndex++
      }, delay)

      return () => clearTimeout(timeoutId)
    }
  }, [inView, id])

  return (
    <>
      <div className="flex flex-col gap-4 sm:hidden">
        {bookmarks.map((bookmark, index) => {
          return (
            <div
              key={`bookmark_${index}`}
              className={cn("grid place-content-start gap-4")}
            >
              <BookmarkCard bookmark={bookmark} />
            </div>
          )
        })}
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4">
        {chunks.map((chunk, chunkIndex) => {
          return (
            <div
              key={`chunk_${chunkIndex}`}
              className={cn("grid place-content-start gap-4")}
            >
              {chunk.map((bookmark) => {
                return <BookmarkCard key={bookmark._id} bookmark={bookmark} />
              })}
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex w-full items-center justify-center">
        <div ref={ref}>
          {inView && isLoading && <Loader className="h-8 w-8 animate-spin" />}
        </div>
      </div>
    </>
  )
}
