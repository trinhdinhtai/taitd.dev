import { useEffect } from "react"
import { GetCommentsResponse } from "@/server/api/routers/comment"

const isValidCommentHash = (hash: string) => {
  return /^#comment-[\dA-Za-z]+$/.test(hash)
}

const isValidReplyHash = (hash: string) => {
  return /^#comment(?:-[\dA-Za-z]+){2}$/.test(hash)
}

export const useCommentHighlighter = (
  comments?: GetCommentsResponse,
  id?: string,
  cb?: (v: boolean) => void
) => {
  useEffect(() => {
    if (!cb || !id) return

    const hash = window.location.hash
    if (isValidCommentHash(hash)) {
      const hashParentId = hash.split("-")[1]

      if (hashParentId === id) {
        cb(true)
      }
    }
  }, [cb, id])

  useEffect(() => {
    if (comments) {
      const hash = window.location.hash

      let type: "comments" | "replies" | undefined

      if (isValidCommentHash(hash)) {
        type = "comments"
      }

      if (isValidReplyHash(hash)) {
        type = "replies"
      }

      if (!type) return
      if (type === "replies" && !comments[0]?.parentId) return
      if (type === "comments" && comments[0]?.parentId) return

      history.replaceState(null, "", window.location.pathname)

      const targetComment = document.querySelector(hash)

      if (targetComment) {
        targetComment.classList.add("highlighted-comment")

        setTimeout(() => {
          const top =
            targetComment.getBoundingClientRect().top + window.scrollY - 128

          window.scrollTo({ top, behavior: "smooth" })
        }, 0)
      }
    }
  }, [comments])

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const highlightedComment = document.querySelector(
        `${window.location.hash}.highlighted-comment`
      )

      if (!highlightedComment) return
      if (!(e.target instanceof HTMLElement)) return
      if (highlightedComment.contains(e.target)) return

      highlightedComment.classList.remove("highlighted-comment")
    }

    document.addEventListener("click", clickHandler)

    return () => {
      document.removeEventListener("click", clickHandler)
    }
  }, [])
}
