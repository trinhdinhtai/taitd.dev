import { NextResponse } from "next/server"

import { getGithubActivities } from "@/lib/github"

export async function GET() {
  try {
    const contributions = await getGithubActivities()
    return NextResponse.json(contributions)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
