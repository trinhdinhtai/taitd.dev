export type SiteConfig = {
  name: string
  handle: string
  description: string
  url: string
  ogImage: string
  links: {
    mail: string
    twitter: string
    github: string
  }
  author: {
    name: string
    email: string
  }
  repo: string
  utmParams: {
    source: string
  }
}
