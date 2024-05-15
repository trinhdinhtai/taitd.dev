import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET() {
  try {
    const projects = await db.project.findMany()
    return NextResponse.json(projects)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
