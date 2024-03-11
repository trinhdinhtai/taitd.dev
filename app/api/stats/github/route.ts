import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    return NextResponse.json("Hello World")
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
