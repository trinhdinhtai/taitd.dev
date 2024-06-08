import { useCommentsContext } from "@/contexts/comments"
import { api } from "@/trpc/react"
import { PostComment, User } from "@prisma/client"
import { MoreVerticalIcon } from "lucide-react"
import { toast } from "sonner"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog"

interface CommentMenuProps {
  comment: PostComment & { user: User }
}

export default function CommentMenu({ comment }: CommentMenuProps) {
  const { slug } = useCommentsContext()
  const { copy } = useCopyToClipboard()
  const { user } = useCurrentUser()
  const utils = api.useUtils()

  const { parentId, id, userId, isDeleted } = comment

  const commentIdentifier = parentId
    ? `comment-${parentId}-${id}`
    : `comment-${id}`

  const { mutate, isPending } = api.comment.delete.useMutation({
    onSuccess: () => toast.success("Deleted a comment"),
    onError: (error) => toast.error(error.message),
    onSettled: () => utils.comment.getAll.invalidate(),
  })

  return (
    <ResponsiveDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label="Open menu"
            type="button"
          >
            <MoreVerticalIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              copy({
                text: `${window.location.origin}/blog/${slug}#${commentIdentifier}`,
                successMessage: "Link copied to clipboard",
              })
            }
          >
            Copy link
          </DropdownMenuItem>
          {/* 
            Radix Dialog + DropdownMenu bug 🥺
            https://github.com/radix-ui/primitives/issues/1836
          */}
          <ResponsiveDialogTrigger asChild>
            {!isDeleted && user?.id === userId ? (
              <DropdownMenuItem
                className="text-red-600 focus:text-red-500"
                disabled={isPending}
                aria-disabled={isPending}
              >
                Delete
              </DropdownMenuItem>
            ) : null}
          </ResponsiveDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Delete a comment</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogFooter>
          <ResponsiveDialogClose>Cancel</ResponsiveDialogClose>
          <Button variant="destructive" onClick={() => mutate({ id })}>
            Delete
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}
