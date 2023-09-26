import * as z from "zod"

import { db } from "@/lib/db"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const ipAddress =
      req.headers["x-forwarded-for"] ||
      // Fallback for localhost or non Vercel deployments
      "0.0.0.0"

    console.log("file: route.ts:17 ~ ipAddress:", ipAddress)

    const { params } = routeContextSchema.parse(context)

    const post = await db.post.findUnique({
      where: {
        slug: params.slug,
      },
    })

    return new Response(JSON.stringify(ipAddress))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response("Internal error", { status: 500 })
  }
}
