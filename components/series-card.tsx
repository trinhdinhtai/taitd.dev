import Image from "next/image"
import Link from "next/link"
import { SeriesWithPosts } from "@/types"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SeriesCardProps {
  series: SeriesWithPosts
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const { posts, title } = series
  return (
    <Card>
      <div className="p-2">
        <Image
          src={posts[0].image}
          width={500}
          height={700}
          alt={`Hero image for series "${title}"`}
          blurDataURL={posts[0].image}
          quality={75}
          className="aspect-[16/9] h-auto w-full rounded-lg border object-cover backdrop-blur-xl"
        />
      </div>

      <CardHeader className="py-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="divide-y dark:divide-gray-800">
          {posts.map((post) => (
            <li className="py-4" key={post.slug}>
              <Link href={post.slug}>
                <p className="line-clamp-1 overflow-ellipsis text-sm font-semibold hover:underline">
                  {post.title}
                </p>
              </Link>

              <span className="text-xs text-muted-foreground">
                {post.readingTime.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
