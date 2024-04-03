import { ContentNavItem, NavItem } from "@/types"

const moreContent: ContentNavItem[] = [
  {
    title: "Series",
    href: "/series",
    description: "Collections of posts on a particular topic.",
  },
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
  {
    title: "Certificates",
    href: "/certificates",
    description: "My certificates and achievements.",
  },
  {
    title: "Photos",
    href: "/photos",
    description: "My photos from various events and places.",
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
