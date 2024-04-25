import { Roboto_Mono as FontCode, Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "@/styles/globals.css"

import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { TailwindIndicator } from "@/components/tailwind-indicator"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontCode = FontCode({
  subsets: ["latin"],
  variable: "--font-code",
})

// Font files can be colocate inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

const options = {
  title: "Trinh Dinh Tai | Software Developer",
  description:
    "Trinh Dinh Tai is a Software Developer and Technical Writer who is passionate about building solutions and contributing to open source communities",
  url: "https://taitd.io.vn",
  ogImage:
    "https://res.cloudinary.com/daukjyo6s/image/upload/v1712067670/TAITD_vqdboi.png",
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(options.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "Trịnh Đình Tài",
      url: "https://taitd.io.vn",
    },
  ],
  creator: "Trịnh Đình Tài",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: options.ogImage,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@taitd",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isProduction = process.env.NODE_ENV === "production"

  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable,
            fontCode.variable,
            fontHeading.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="pointer-events-none fixed inset-0 z-[99] h-full w-full overflow-hidden bg-[url(/noise.png)] opacity-40 dark:opacity-60" />
            {children}
            <Toaster position="bottom-right" className="!font-sans" />
            <ScrollToTopButton />
            <TailwindIndicator />
          </ThemeProvider>

          {isProduction && (
            <script
              defer
              src="https://analytics.us.umami.is/script.js"
              data-website-id="918e78b6-7a58-445d-9c09-1c0e53d6fe18"
            ></script>
          )}
        </body>
      </html>
    </QueryProvider>
  )
}
