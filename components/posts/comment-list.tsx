"use client"

import { useCommentsContext } from "@/contexts/comments"
import { api } from "@/trpc/react"
import { Loader } from "lucide-react"

export default function CommentList() {
  const { slug } = useCommentsContext()

  const { data, isLoading } = api.comment.getAll.useQuery({ slug })

  return (
    <div className="space-y-2 rounded-lg border py-2 dark:bg-zinc-900/30">
      {isLoading ? <Loader className="size-4 animate-spin" /> : null}

      {!data?.length ? (
        <div className="flex min-h-10 items-center justify-center">
          <p className="text-sm text-muted-foreground">No comments</p>
        </div>
      ) : null}
    </div>
  )
}
