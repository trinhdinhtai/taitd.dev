import { allPosts } from "@/.contentlayer/generated"
import { compareDesc } from "date-fns"

import PostCard from "./post-card"
import SectionHeading from "./ui/section-heading"

const BlogSection = () => {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })
  return (
    <div>
      <SectionHeading>Recent Posts</SectionHeading>
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default BlogSection
