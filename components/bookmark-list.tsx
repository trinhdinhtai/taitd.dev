import { Bookmark } from "@/types"

import BookmarkCard from "@/components/bookmark-card"
import LoadMore from "@/components/load-more"

interface BookmarkListProps {
  id: string
  initialBookmarks: Bookmark[]
}

export default function BookmarkList({
  id,
  initialBookmarks,
}: BookmarkListProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {initialBookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark._id} bookmark={bookmark} />
        ))}
      </div>

      <LoadMore id={id} />
    </>
  )
}
