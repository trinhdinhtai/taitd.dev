"use client"

import { useEffect } from "react"

import { usePollIfInView } from "@/hooks/use-poll-if-in-view"
import { usePostLikes } from "@/hooks/use-post-likes"
import { usePostViews } from "@/hooks/use-post-view"

import { InlineMetric } from "./inline-metric"
import { LoadingDots } from "./ui/loading-dot"

interface PostMetricsProps {
  slug: string
}

const PostMetrics = ({ slug }: PostMetricsProps) => {
  const interval = 5000
  const { shouldPoll, intersectionRef } = usePollIfInView(interval)

  const {
    views,
    isLoading: viewsIsLoading,
    isError: viewsIsError,
    increment: incrementViews,
  } = usePostViews(slug, {
    // Avoid fetching view count we *know* is stale since increment() mutation
    // returns view count
    revalidateOnMount: false,
    // Only poll when in view
    refreshInterval: shouldPoll ? interval : 0,
    // Override `usePostViews` default dedupingInterval for the polling usecase
    // (refresh interval can never be faster than deduping interval)
    dedupingInterval: interval,
  })

  const {
    likes,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = usePostLikes(slug, {
    // only poll when in view
    refreshInterval: shouldPoll ? interval : 0,
  })

  useEffect(() => {
    incrementViews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div ref={intersectionRef}>
        {viewsIsError || viewsIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={views} stat={views} />
        )}{" "}
        views
      </div>

      <div className="text-muted-foreground">&middot;</div>

      <div>
        {" "}
        {likesIsError || likesIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={likes} stat={likes} />
        )}{" "}
        likes
      </div>
    </>
  )
}

export default PostMetrics
