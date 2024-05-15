"use server"

import { db } from "@/server/db"

export const getBlogReactionsCount = async () => {
  const reactionsCount = await db.postFavorite.aggregate({
    _sum: {
      likes: true,
    },
  })

  return reactionsCount._sum.likes
}
