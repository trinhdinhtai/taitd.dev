import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { z } from "zod"

export const reactionRouter = createTRPCRouter({
  set: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        like: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const user = ctx.session.user

      const reaction = await ctx.db.postCommentReaction.findFirst({
        where: {
          commentId: input.id,
          userId: user.id,
        },
      })

      if (!reaction) {
        await ctx.db.postCommentReaction.create({
          data: {
            commentId: input.id,
            userId: user.id,
            like: input.like,
          },
        })
        return
      }

      await ctx.db.postCommentReaction.update({
        where: {
          id: reaction.id,
        },
        data: {
          like: input.like,
        },
      })
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const user = ctx.session.user

      await ctx.db.postCommentReaction.deleteMany({
        where: {
          commentId: input.id,
          userId: user.id,
        },
      })
    }),
})
