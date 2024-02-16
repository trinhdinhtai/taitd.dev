import Image from "next/image"
import { Link2Icon } from "lucide-react"

interface BookmarkCardProps {
  bookmark: any
}
export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <a
      href={bookmark.link}
      target="_blank"
      rel="noopener noreferrer"
      className="shadow-thumbnail flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 transition-colors duration-300 hover:bg-gray-100"
    >
      <span className="aspect-[1200/630] overflow-hidden rounded-lg">
        <Image
          src={bookmark.cover}
          alt={bookmark.title}
          width={1200}
          height={630}
          className="aspect-[1200/630] animate-reveal rounded-lg border bg-[url('/images/fallback.webp')] bg-cover bg-center bg-no-repeat object-cover"
        />
      </span>

      <div className="flex flex-col gap-1">
        <h3>{bookmark.title}</h3>
        <span className="line-clamp-5 inline-flex items-center gap-1 text-sm text-gray-500">
          <Link2Icon size={16} />
          {bookmark.domain}
        </span>
        <span className="line-clamp-6 text-sm">
          {bookmark.excerpt || bookmark.note}
        </span>
      </div>
    </a>
  )
}
