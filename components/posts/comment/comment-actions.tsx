"use client"

import { useCommentContext } from "@/contexts/comment"
import { useCommentsContext } from "@/contexts/comments"
import { useRatesContext } from "@/contexts/rates"
import { GetCommentsResponse } from "@/server/api/routers/comment"
import { api, RouterInputs } from "@/trpc/react"
import { UseTRPCMutationOptions } from "@trpc/react-query/shared"
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Button } from "@/components/ui/button"

export default function CommentActions() {
  const { comment, setIsReplying } = useCommentContext()
  const { increment, decrement, getCount } = useRatesContext()
  const { slug } = useCommentsContext()
  const { isAuthenticated } = useCurrentUser()

  const utils = api.useUtils()

  const mutationOptions: UseTRPCMutationOptions<
    RouterInputs["reaction"]["set"] | RouterInputs["reaction"]["delete"],
    unknown,
    void,
    {
      previousData: GetCommentsResponse | undefined
    }
  > = {
    onMutate: (newData) => {
      increment()
      void utils.comment.getAll.cancel()

      const input = {
        slug,
        ...(comment.parentId ? { parentId: comment.parentId } : {}),
      }

      const previousData = utils.comment.getAll.getData(input)

      utils.comment.getAll.setData(input, (oldData) => {
        if (!oldData) return oldData

        return oldData.map((c) => {
          if (c.id === newData.id) {
            const hasLike = "like" in newData

            let likesCount: number = c.likesCount
            let dislikesCount: number = c.dislikesCount

            if (c.liked === true) likesCount--
            if (c.liked === false) dislikesCount--

            if (hasLike && newData.like) likesCount++
            if (hasLike && !newData.like) dislikesCount++

            return {
              ...c,
              likesCount,
              dislikesCount,
              liked: hasLike ? newData.like : null,
            }
          }

          return c
        })
      })

      return { previousData }
    },
    onSettled: () => {
      decrement()

      if (getCount() === 0) {
        void utils.comment.getAll.invalidate()
      }
    },
  }

  const reactionSetMutation = api.reaction.set.useMutation(mutationOptions)
  const reactionDeleteMutation =
    api.reaction.delete.useMutation(mutationOptions)

  const handleCommentReaction = (like: boolean) => {
    if (like === comment.liked) {
      reactionDeleteMutation.mutate({ id: comment.id })
      return
    }

    reactionSetMutation.mutate({ id: comment.id, like })
  }

  return (
    <div className="flex gap-1">
      <Button
        variant="secondary"
        size="sm"
        disabled={!isAuthenticated}
        className="gap-1"
        onClick={() => handleCommentReaction(true)}
      >
        <ThumbsUpIcon className="size-4" />
        {comment.likesCount}
      </Button>

      <Button
        variant="secondary"
        size="sm"
        disabled={!isAuthenticated}
        className="gap-1"
      >
        <ThumbsDownIcon className="size-4" />
        {comment.dislikesCount}
      </Button>

      {!comment.parentId && isAuthenticated ? (
        <Button
          size="sm"
          variant="secondary"
          className="text-xs font-medium text-muted-foreground"
          onClick={() => setIsReplying(true)}
        >
          Reply
        </Button>
      ) : null}
    </div>
  )
}
