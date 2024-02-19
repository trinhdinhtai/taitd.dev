import { useCallback, useMemo } from "react"

import { cn } from "@/lib/utils"
import BookmarkCard from "@/components/bookmark-card"

interface BookmarkListProps {
  id: string
  bookmarks: any[]
}

export default function BookmarkList({ id, bookmarks }: BookmarkListProps) {
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
    </>
  )
}
