import type { Route } from "next"
import type { SiteConfig } from "@/types"

import type { NavItem } from "@/types/nav"
import type { User } from "@/types/user"

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Blog",
    href: "/blog",
  },
]

export const USER: User = {
  avatarVariants: {
    lightOn:
      "https://crfwhxnljoovwr4n.public.blob.vercel-storage.com/avatar-light-on.webp",
    lightOff:
      "https://crfwhxnljoovwr4n.public.blob.vercel-storage.com/avatar-light-off.webp",
    darkOn:
      "https://crfwhxnljoovwr4n.public.blob.vercel-storage.com/avatar-dark-on.webp",
    darkOff:
      "https://crfwhxnljoovwr4n.public.blob.vercel-storage.com/avatar-dark-off.webp",
  },
}

export const siteConfig: SiteConfig = {
  name: "Taitd",
  handle: "@taitd",
  description:
    "This website is my personal blog. I write about web development, JavaScript, TypeScript, React, Node.js, CSS, and more.",
  url: "https://taitd.dev",
  ogImage: "/images/og.png",
  links: {
    mail: "taitd153.dev@gmail.com",
    twitter: "https://twitter.com/taitddev",
    github: "https://github.com/trinhdinhtai/next-blog",
  },
  author: {
    name: "Trịnh Đình Tài",
    email: "taitd153.dev@gmail.com",
  },
  repo: "trinhdinhtai/taitd.dev",
  utmParams: {
    source: "taitd.dev",
  },
}
