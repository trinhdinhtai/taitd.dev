export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    mail: string
    twitter: string
    github: string
  }
}

export type NavItem = {
  title: string
  href?: string
  disabled?: boolean
  description?: string
  content?: ContentNavItem[]
}

export interface ContentNavItem extends NavItem {
  href: string
}

export type Project = {
  title: string
  description: string
  tags: string[]
  imageUrl: string
}
