import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const projects = await prisma.project.findMany()
    return NextResponse.json(projects)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
