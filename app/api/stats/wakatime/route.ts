import { NextResponse } from "next/server"

import { getCodingHours } from "@/lib/wakatime"

export async function GET() {
  try {
    const codingHours = await getCodingHours()
    return NextResponse.json({ codingHours })
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
