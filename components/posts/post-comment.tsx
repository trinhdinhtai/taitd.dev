"use client"

import { useCallback, useRef } from "react"
import { CommentsProvider } from "@/contexts/comments"
import { RatesProvider } from "@/contexts/rates"

import CommentForm from "@/components/posts/comment-form"
import CommentList from "@/components/posts/comment-list"

interface PostCommentProps {
  slug: string
}

export default function PostComment({ slug }: PostCommentProps) {
  const mutationCount = useRef(0)

  const increment = useCallback(() => {
    mutationCount.current += 1
  }, [])

  const decrement = useCallback(() => {
    mutationCount.current -= 1
  }, [])

  const getCount = useCallback(() => mutationCount.current, [])

  return (
    <RatesProvider value={{ increment, decrement, getCount }}>
      <CommentsProvider value={{ slug }}>
        <div className="space-y-6">
          <CommentForm />
          <CommentList />
        </div>
      </CommentsProvider>
    </RatesProvider>
  )
}
