import { createContext, useContext } from "react"
import { GetCommentsResponse } from "@/server/api/routers/comment"

export type CommentContext = {
  isEditing: boolean
  isReplying: boolean
  isOpenReplies: boolean
  setIsEditing: (value: boolean) => void
  setIsReplying: (value: boolean) => void
  setIsOpenReplies: (value: boolean) => void
  slug: string
  comment: GetCommentsResponse[0]
}

const CommentContext = createContext<CommentContext | undefined>(undefined)

export const useCommentContext = () => {
  const context = useContext(CommentContext)

  if (!context) {
    throw new Error("useCommentContext must be used within a CommentProvider")
  }

  return context
}

export const CommentProvider = CommentContext.Provider
