import { cn } from "@/lib/utils"
import BookmarkCard from "@/components/bookmark-card"

interface BookmarkListProps {
  id: string
  bookmarks: any[]
}

export default function BookmarkList({ id, bookmarks }: BookmarkListProps) {
  return (
    <>
      <div className="@lg:hidden flex flex-col gap-4">
        {bookmarks.map((bookmark, index) => {
          return (
            <div key={`bookmark_${index}`} className={cn("grid gap-4")}>
              <BookmarkCard />
            </div>
          )
        })}
      </div>
    </>
  )
}
