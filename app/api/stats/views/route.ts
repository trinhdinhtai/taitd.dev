import { NextResponse } from "next/server"

import getAnalytics from "@/lib/umami"

export async function GET() {
  try {
    const data = await getAnalytics()
    return NextResponse.json({ data })
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
