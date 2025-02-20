import { allPosts } from "content-collections"

export const getTagsWithCount = () =>
  allPosts
    .filter((post) => post.published)
    .reduce((acc: { [key: string]: number }, post) => {
      post.tags?.forEach((tag) => {
        if (acc[tag]) {
          acc[tag] += 1
        } else {
          acc[tag] = 1
        }
      })
      return acc
    }, {})
