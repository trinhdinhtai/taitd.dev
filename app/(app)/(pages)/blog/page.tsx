import { Suspense } from "react"

import { PostSearchInput } from "@/components/features/blog/post-search-input"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"

export default function BlogPage() {
  return (
    <>
      <div className="min-h-svh">
        <PageHeading>
          <PageHeadingTagline>Blog</PageHeadingTagline>
          <PageHeadingTitle>
            Writing about code, design, and everything in between.
          </PageHeadingTitle>
        </PageHeading>

        <div className="p-2">
          <Suspense
            fallback={
              <div className="flex h-9 w-full rounded-lg border border-input dark:bg-input/30" />
            }
          >
            <PostSearchInput />
          </Suspense>
        </div>
      </div>
    </>
  )
}
