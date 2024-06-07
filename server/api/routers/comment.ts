import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { z } from "zod"

export const commentRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        parentId: z.string().optional(),
        sort: z.enum(["newest", "oldest"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const session = ctx.session

      const query = await ctx.db.postComment.findMany({
        where: {
          postId: input.slug,
          parentId: input.parentId,
        },
        orderBy: {
          createdAt: input.sort === "newest" ? "desc" : "asc",
        },
      })

      return query
    }),
})
