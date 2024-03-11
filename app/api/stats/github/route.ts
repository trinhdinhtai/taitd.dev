import { NextResponse } from "next/server"

import { getGithubStats } from "@/lib/github"

export async function GET() {
  try {
    const { user, repos, starsCount } = (await getGithubStats()) || {}
    return NextResponse.json({ user, repos, starsCount })
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
