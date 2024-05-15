import { Metadata } from "next"
import { allPosts } from "@/.contentlayer/generated"
import { compareDesc } from "date-fns"

import PageHeading from "@/components/page-heading"
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
    <>
      <PageHeading
        title="Blog"
        description="A blog built using Contentlayer. Posts are written in MDX."
      />

      {posts?.length ? (
        <div className="grid gap-10 lg:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>
      ) : null}
    </>
  )
}

export default BlogPage
