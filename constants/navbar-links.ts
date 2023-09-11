import { ContentNavItem, NavItem } from "@/types";

import { defaultAuthor, siteMetadata } from "@/lib/metadata";

const blogContent: ContentNavItem[] = [
  {
    title: "Speaking",
    href: "/speaking",
    description:
      "My previous (and current) talks, workshops, and other speaking engagements.",
  },
  {
    title: "Videos",
    href: defaultAuthor.socialProfiles.find(
      (platform) => platform.name === "youtube",
    )?.link as string,
    description: "My YouTube channel where I talk about web development.",
  },
  {
    title: "Newsletter",
    href: siteMetadata.newsletterUrl as string,
    description: "My newsletter about software development",
  },
  {
    title: "Teaching",
    href: "/teaching",
    description: "I teach others. Sometimes for free, sometimes for money.",
  },
];

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
    title: "Content",
    content: blogContent,
  },
  {
    title: "More",
    content: moreContent,
  },
];
