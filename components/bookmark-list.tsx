import { cn } from "@/lib/utils"
import BookmarkCard from "@/components/bookmark-card"

interface BookmarkListProps {
  id: string
  bookmarks: any[]
}

export default function BookmarkList({ id, bookmarks }: BookmarkListProps) {
  return (
    <>
      <div className="grid sm:grid-cols-2 sm:gap-4">
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
    </>
  )
}
