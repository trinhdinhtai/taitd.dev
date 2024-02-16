import { ContentNavItem, NavItem } from "@/types"

const moreContent: ContentNavItem[] = [
  {
    title: "Snippets",
    href: "/snippets",
    description:
      "Code snippets that I use often. Mostly for personal reference.",
  },
  {
    title: "Stats",
    href: "/stats",
    description: "My personal statistics about coding and other things.",
  },
  {
    title: "Uses",
    href: "/uses",
    description: "My hardware, software, and other tools.",
  },
  {
    title: "Bookmarks",
    href: "/bookmarks",
    description: "My collection of bookmarks.",
  },
]

export const navbarLinks: NavItem[] = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Project",
    href: "/project",
  },
  {
    title: "More",
    content: moreContent,
  },
]
