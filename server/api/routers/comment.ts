import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import type { RouterOutputs } from "@/trpc/react"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

const baseJSONContent = z.object({
  type: z.string().optional(),
  attrs: z.record(z.any()).optional(),
  marks: z
    .array(
      z.object({
        type: z.string(),
        attrs: z.record(z.any()).optional(),
      })
    )
    .optional(),
  text: z.string().optional(),
})

const JSONContentSchema: z.ZodType<z.infer<typeof baseJSONContent>> =
  baseJSONContent.extend({
    content: z.array(z.lazy(() => JSONContentSchema)).optional(),
  })

export const commentRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        parentId: z.string().optional(),
        sort: z.enum(["asc", "desc"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const session = ctx.session

      const query = await ctx.db.postComment.findMany({
        where: {
          postId: input.slug,
          parentId: input.parentId,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: input.sort || "desc",
        },
      })

      const formattedComments = await Promise.all(
        query.map(async (comment) => {
          const repliesCount = await ctx.db.postComment.count({
            where: {
              parentId: comment.id,
            },
          })

          const likesCount = await ctx.db.postCommentReaction.count({
            where: {
              commentId: comment.id,
              like: true,
            },
          })

          const dislikesCount = await ctx.db.postCommentReaction.count({
            where: {
              commentId: comment.id,
              like: false,
            },
          })

          const userReaction = await ctx.db.postCommentReaction.findFirst({
            where: {
              commentId: comment.id,
              userId: session?.user.id,
            },
          })

          const liked = userReaction && userReaction.like === true
          const disliked = userReaction && userReaction.like === false

          return {
            ...comment,
            likesCount,
            dislikesCount,
            repliesCount,
            liked,
            disliked,
          }
        })
      )

      return formattedComments
    }),

  getCount: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const count = await ctx.db.postComment.count({
        where: {
          postId: input.slug,
        },
      })

      return count
    }),

  create: protectedProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        content: JSONContentSchema,
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session

      const comment = await ctx.db.postComment.create({
        data: {
          parentId: input.parentId,
          postId: input.slug,
          content: input.content,
          userId: session.user.id,
        },
      })

      return comment
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session

      // Check comment exists
      const comment = await ctx.db.postComment.findFirst({
        where: {
          id: input.id,
        },
        include: {
          user: true,
        },
      })

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        })
      }

      // Check if the user is the owner of the comment
      if (comment.user.email !== session.user.email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        })
      }

      // TODO: If the comment has replies, just mark it as deleted and keep the replies.

      // Otherwise, delete the comment
      await ctx.db.postComment.delete({
        where: {
          id: input.id,
        },
      })
    }),
})

export type GetCommentsResponse = RouterOutputs["comment"]["getAll"]
export type CommentResponse = RouterOutputs["comment"]["getAll"][0]
