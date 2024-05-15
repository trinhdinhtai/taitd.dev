"use server"

import { db } from "@/server/db"

const getBlogReactionsCount = async () => {
  const reactionsCount = await db.postFavorite.aggregate({
    _sum: {
      likes: true,
    },
  })

  return reactionsCount._sum.likes
}

const getPostMetrics = async (slug: string) => {
  const post = await db.post.findFirst({
    where: {
      slug,
    },
    select: {
      views: true,
      likes: true,
    },
  })

  return { views: post?.views, likes: post?.likes }
}

export { getBlogReactionsCount, getPostMetrics }
