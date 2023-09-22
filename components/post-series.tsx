import Link from "next/link"
import { PostSeries } from "@/types"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PostSeriesProps {
  series: PostSeries
}
const PostSeriesBox = ({ series }: PostSeriesProps) => {
  const currentIndex = series.posts.findIndex((post: any) => post.isCurrent) + 1

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Series: {series.title}</CardTitle>
      </CardHeader>

      <CardContent>
        Episodes: ({currentIndex}/{series.posts.length})
        <ul>
          {series.posts.map((post: any) => (
            <li
              key={post.slug}
              className={cn(
                "relative my-3 list-none pl-7 text-sm before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full",
                post.isCurrent &&
                  "before:bg-accent-foreground/90 before:ring-[3px] before:ring-purple-400/20 before:ring-offset-1 before:ring-offset-black/10",
                !post.isCurrent &&
                  "font-bold before:bg-primary/30 hover:before:bg-accent-foreground/90 hover:before:ring-[3px] hover:before:ring-purple-400/20 hover:before:ring-offset-1 hover:before:ring-offset-black/10"
              )}
            >
              {post.published ? (
                post.isCurrent ? (
                  <span>{post.title}</span>
                ) : (
                  <Link
                    className="transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                    href={post.slug}
                  >
                    {post.title}
                  </Link>
                )
              ) : (
                <span>{post.title}</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default PostSeriesBox
