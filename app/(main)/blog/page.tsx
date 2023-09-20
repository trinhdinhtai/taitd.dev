import { Metadata } from "next"
import { allPosts } from "@/.contentlayer/generated"
import { compareDesc } from "date-fns"

import Container from "@/components/layout/container"
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
    <Container>
      <PageHeading
        title="Blog"
        description="A blog built using Contentlayer. Posts are written in MDX."
      />

      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>
      ) : null}
    </Container>
  )
}

export default BlogPage
