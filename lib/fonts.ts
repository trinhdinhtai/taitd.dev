import { Caveat, Google_Sans_Code } from "next/font/google"
import { GeistSans } from "geist/font/sans"

import { cn } from "@/lib/utils"

const fontSans = GeistSans

const fontMono = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-google-sans-code",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
})

const fontHandwritten = Caveat({
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-handwritten",
})

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontHandwritten.variable,
  "[--font-sans:var(--font-geist-sans)]",
  "[--font-mono:var(--font-google-sans-code)]"
)
