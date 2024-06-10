import { commentRouter } from "@/server/api/routers/comment"
import { reactionRouter } from "@/server/api/routers/reaction"
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"

export const appRouter = createTRPCRouter({
  comment: commentRouter,
  reaction: reactionRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
