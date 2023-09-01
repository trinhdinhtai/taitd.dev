import { ContentNavItem, NavItem } from "@/types";

const content: ContentNavItem[] = [
  {
    title: "Blog",
    href: "/posts",
    description: "Blog posts. Mostly about web development. Or chicken fingers",
  },
];

export const navigationLinks: NavItem[] = [
  {
    title: "Content",
    content,
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Uses",
    href: "/uses",
  },
  {
    title: "Now",
    href: "/now",
  },
];
