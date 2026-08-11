import { Suspense } from "react"

import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { PostList } from "@/features/blog/components/post-list"
import { PostListWithSearch } from "@/features/blog/components/post-list-with-search"
import { PostSearchInput } from "@/features/blog/components/post-search-input"
import { getBlogPosts } from "@/features/content"

export default function BlogPage() {
  const allPosts = getBlogPosts()

  return (
    <>
      <div className="min-h-svh">
        <PageHeading>
          <PageHeadingTagline>Blog</PageHeadingTagline>
          <PageHeadingTitle className="py-2">
            Writing about code, design, and everything in between.
          </PageHeadingTitle>
        </PageHeading>

        <div className="screen-line-bottom p-2">
          <Suspense
            fallback={
              <div className="flex h-9 w-full rounded-lg border border-input dark:bg-input/30" />
            }
          >
            <PostSearchInput />
          </Suspense>
        </div>

        <Suspense fallback={<PostList posts={allPosts} />}>
          <PostListWithSearch posts={allPosts} />
        </Suspense>
      </div>
    </>
  )
}
