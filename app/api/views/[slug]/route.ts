import * as z from "zod"

import { prisma } from "@/lib/prisma"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
})

export async function GET(
  _: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    const { slug } = params

    const post = await prisma.post.findUnique({
      where: { slug },
    })

    const views = post?.views || 1

    return new Response(JSON.stringify(views))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function POST(
  _: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    const { slug } = params

    // Update the post.
    const post = await prisma.post.upsert({
      where: { slug },
      create: { slug, views: 1 },
      update: { views: { increment: 1 } },
    })

    const views = post?.views || 1

    return new Response(JSON.stringify(views))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
