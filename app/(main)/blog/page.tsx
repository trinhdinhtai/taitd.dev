import { Metadata } from "next"
import { allPosts } from "@/.contentlayer/generated"
import { compareDesc } from "date-fns"

import PostCard from "@/components/post-card"

export const metadata: Metadata = {
  title: "Blog",
}

const BlogPage = () => {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            A blog built using Contentlayer. Posts are written in MDX.
          </p>
        </div>
      </div>

      <hr className="my-8" />

      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard key={post._id} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default BlogPage
