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
  href: string
  disabled?: boolean
}

export type Project = {
  title: string
  description: string
  tags: string[]
  imageUrl: string
}
