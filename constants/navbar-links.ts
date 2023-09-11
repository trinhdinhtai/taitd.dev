import { ContentNavItem, NavItem } from "@/types";

const moreContent: ContentNavItem[] = [
  {
    title: "Uses",
    href: "/uses",
    description: "My hardware, software, and other tools.",
  },
];

export const navigationLinks: NavItem[] = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Blog",
    href: "/posts",
  },
  {
    title: "Projects",
    href: "/projects",
  },

  {
    title: "More",
    content: moreContent,
  },
];
