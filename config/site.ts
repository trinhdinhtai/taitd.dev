import type { Route } from "next"
import type { SiteConfig } from "@/types"

import type { NavItem } from "@/types/nav"
import type { SocialProfile, User } from "@/types/user"

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Blog",
    href: "/blog",
  },
]

export const USER: User = {
  firstName: "Trịnh Đình",
  lastName: "Tài",
  username: "taitd",
  displayName: "Trịnh Đình Tài",
  address: "Hà Nội, Việt Nam",
  timeZone: "Asia/Ho_Chi_Minh",
  phoneNumberB64: "Kzg0OTY1OTEzMTQ4", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  emailB64: "dGFpdGQxNTMuZGV2QGdtYWlsLmNvbQ==", // base64 encoded
  website: "https://taitd.dev",
  pronouns: "he/him",
  gender: "male",
  dateOfBirth: "1996-03-15",
  about:
    "I'm a full stack developer with a passion for building web applications. I'm a quick learner and I'm always looking to improve my skills.",
  jobTitle: "Full Stack Developer",
  jobs: [
    {
      title: "Full Stack Developer / Technical Leader",
      company: "VangleTek JSC",
      website: "https://www.vangle.vn/vi/",
      experienceId: "vangletek",
    },
  ],
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
  flipSentences: [
    "Software Engineer",
    "Web Developer",
    "UI/UX Designer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
}

export const SOCIAL = {
  github: {
    href: "https://github.com/trinhdinhtai",
    title: "GitHub",
    handle: "trinhdinhtai",
  },
  linkedin: {
    href: "https://www.linkedin.com/in/taitd153/",
    title: "LinkedIn",
    handle: "@taitd153",
  },
  x: {
    href: "https://twitter.com/taitddev",
    title: "Twitter",
    handle: "@taitddev",
  },
  dailydotdev: {
    href: "https://daily.dev/taitd",
    title: "Daily.dev",
    handle: "@taitd",
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))

export const GITHUB_USERNAME = SOCIAL.github.handle

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const SITE_CONFIG: SiteConfig = {
  name: "Taitd",
  handle: "@taitd",
  description:
    "This website is my personal blog. I write about web development, JavaScript, TypeScript, React, Node.js, CSS, and more.",
  url: "https://taitd.dev",
  ogImage: "https://crfwhxnljoovwr4n.public.blob.vercel-storage.com/og.png",
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
  keywords: [
    "taitd",
    "trinhdinhtai",
    "Trịnh Đình Tài",
    "Trinh Dinh Tai",
    "dinhtai",
    "dinh tai",
    "taitd.dev",
  ],
}
