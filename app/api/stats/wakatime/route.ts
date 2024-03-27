import { NextResponse } from "next/server"

import { getCodingHours, getWeeklyCodingHours } from "@/lib/wakatime"

export async function GET() {
  try {
    const [totalCodingHours, weekly] = await Promise.all([
      getCodingHours(),
      getWeeklyCodingHours(),
    ])
    return NextResponse.json({ codingHours: totalCodingHours, weekly })
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
