import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

export const viewRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { slug: input.slug },
      })

      return { views: post?.views ?? 0 }
    }),
})
