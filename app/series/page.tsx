import { Metadata } from "next"
import { SeriesWithPosts } from "@/types"
import { allPosts } from "content-collections"
import { compareDesc } from "date-fns"

import PageHeading from "@/components/page-heading"
import SeriesCard from "@/components/series-card"

export const metadata: Metadata = {
  title: "Blog",
}

const groupPostsBySeries = () => {
  const seriesWithPosts: SeriesWithPosts[] = []
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  for (const post of posts) {
    if (!post?.series) continue

    const seriesIndex = seriesWithPosts.findIndex(
      (item) => item.title === post.series?.title
    )

    if (seriesIndex !== -1) {
      seriesWithPosts[seriesIndex].posts.push(post)
    } else {
      seriesWithPosts.push({
        title: post.series.title,
        posts: [post],
      })
    }
  }

  return seriesWithPosts
}

export default function SeriesPage() {
  const postSeries = groupPostsBySeries()

  return (
    <>
      <PageHeading
        title="Series"
        description="A blog built using Contentlayer. Posts are written in MDX."
      />

      {postSeries?.length && (
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {postSeries.map((series) => (
            <SeriesCard key={series.title} series={series} />
          ))}
        </div>
      )}
    </>
  )
}
