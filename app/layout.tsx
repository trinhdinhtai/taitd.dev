import "../styles/globals.css"

import type { Metadata } from "next"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { SITE_CONFIG, USER } from "@/config/site"
import { fontVariables } from "@/lib/fonts"
import { Providers } from "@/components/providers-temp"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    template: `%s – ${SITE_CONFIG.name}`,
    default: `${USER.displayName} – ${USER.jobTitle}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [
    {
      name: USER.displayName,
      url: SITE_CONFIG.url,
    },
  ],
  creator: USER.displayName,
  openGraph: {
    siteName: SITE_CONFIG.name,
    url: "/",
    type: "profile",
    locale: "en_US",
    firstName: USER.firstName,
    lastName: USER.lastName,
    username: USER.username,
    gender: USER.gender,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <NuqsAdapter>
          <Providers>{children}</Providers>
        </NuqsAdapter>
      </body>
    </html>
  )
}
