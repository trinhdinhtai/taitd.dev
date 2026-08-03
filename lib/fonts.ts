import { Google_Sans_Code } from "next/font/google"
import { GeistSans } from "geist/font/sans"

import { cn } from "@/lib/utils"

const fontSans = GeistSans
const fontMono = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-google-sans-code",
})

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  "[--font-sans:var(--font-geist-sans)]",
  "[--font-mono:var(--font-google-sans-code)]"
)
