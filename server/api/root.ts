import { commentRouter } from "@/server/api/routers/comment"
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"

export const appRouter = createTRPCRouter({
  comment: commentRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
