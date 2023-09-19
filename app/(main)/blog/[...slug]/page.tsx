import { notFound } from "next/navigation"
import { allPosts } from "@/.contentlayer/generated"

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

interface PostPageProps {
  params: {
    slug: string[]
  }
}

const PostPage = async ({ params }: PostPageProps) => {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="container max-w-4xl py-6 lg:py-12">BlogPage</article>
  )
}

export default PostPage
