import type { Route } from "next"
import type { SiteConfig } from "@/types"

import type { NavItem } from "@/types/nav"

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Components",
    href: "/components",
  },
  {
    title: "Blocks",
    href: "/blocks",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Sponsors",
    href: "/sponsors",
  },
]

export const siteConfig: SiteConfig = {
  name: "Taitd",
  handle: "@taitd",
  description:
    "This website is my personal blog. I write about web development, JavaScript, TypeScript, React, Node.js, CSS, and more.",
  url: "https://taitd.io.vn",
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
}
