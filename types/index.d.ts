import { ReactNode } from "react"
import { Post } from "@/.contentlayer/generated"
import { Variants } from "framer-motion"

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
  githubUrl: string
}

export type SeriesItem = {
  title: string
  slug: Post["slug"]
  published: Post["published"]
  isCurrent: boolean
}

export type PostSeries = Series & { posts: SeriesItem[] }

export type PostWithSeries = Omit<Post, "series"> & { series: PostSeries }

export type Collection = {
  _id: string
  item: {
    _id: string
    title: string
    description: string
    slug: string
  }
}

export type Bookmark = {
  _id: string
  title: string
  description: string
  url: string
  imageUrl: string
  tags: string[]
}

export type GitHubUser = {
  login: string
  name: string
  bio: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export type AnimatedTAGProps = {
  variants: Variants
  className?: string
  children: ReactNode
  infinity?: boolean
}
