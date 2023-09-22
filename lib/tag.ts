import { allPosts } from "@/.contentlayer/generated"

export const getTagsWithCount = () =>
  allPosts
    .filter((post) => post.published)
    .reduce((acc, post) => {
      post.tags?.forEach((tag: any) => {
        if (acc[tag]) {
          acc[tag] += 1
        } else {
          acc[tag] = 1
        }
      })
      return acc
    }, {})
