import { Metadata } from "next"
import { allPosts } from "content-collections"
import { compareDesc } from "date-fns"

import PageHeading from "@/components/page-heading"
import PostCard from "@/components/post-card"

interface TagsPageProps {
  params: {
    id: string[]
  }
}

export async function generateMetadata({
  params,
}: TagsPageProps): Promise<Metadata> {
  const tagId = params?.id?.join("/")

  return {
    title: `All posts in ${tagId}`,
    description: `All posts in ${tagId}`,
  }
}

async function getPostFromParams(params: { id: string[] }) {
  const tagId = params?.id?.join("/")

  const posts = allPosts
    .filter((post) => post.published && post?.tags?.includes(tagId))
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return posts
}

const TagsPage = async ({ params }: TagsPageProps) => {
  const posts = await getPostFromParams(params)

  return (
    <>
      <PageHeading
        title={`Tag: ${params?.id?.join("/")}`}
        description="sdsdsd"
      />

      {/* Posts sort by created date */}

      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>
      ) : null}
    </>
  )
}

export default TagsPage
