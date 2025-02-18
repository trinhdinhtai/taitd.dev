import {
  defineCollection,
  defineConfig,
  type Context,
  type Meta,
} from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"

import { rehypePlugins, remarkPlugins } from "@/lib/mdx-plugins"
import { getTOC } from "@/lib/toc"

type BaseDoc = {
  _meta: Meta
  content: string
}

enum TagOptions {
  Starter = "starter",
  Development = "development",
  Docs = "docs",
  Freelancing = "freelancing",
  Opinion = "opinion",
  Jamstack = "jamstack",
  Frontend = "frontend",
  Javascript = "javascript",
  Typescript = "typescript",
  React = "react",
  Nextjs = "nextjs",
  Gatsby = "gatsby",
  Tailwindcss = "tailwindcss",
  Git = "Git",
}

const transform = async <D extends BaseDoc>(document: D, context: Context) => {
  const code = await compileMDX(context, document, {
    remarkPlugins,
    rehypePlugins,
  })
  const [path] = document._meta.path.split(/[/\\]/)

  if (!path) {
    throw new Error(`Invalid path: ${document._meta.path}`)
  }

  return {
    ...document,
    code,
    slug: path,
    toc: await getTOC(document.content),
  }
}

const blogs = defineCollection({
  name: "blogs",
  directory: "content/blog",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    published: z.boolean().default(true),
    image: z.string(),
    tags: z.array(z.nativeEnum(TagOptions)).optional(),
    series: z
      .object({
        title: z.string(),
        order: z.number(),
      })
      .optional(),
    authors: z.array(z.string()).optional(),
  }),
  transform,
})

const pages = defineCollection({
  name: "pages",
  directory: "content/pages",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
  }),
  transform,
})

const snippets = defineCollection({
  name: "snippets",
  directory: "content/snippets",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    category: z.string(),
    lastUpdatedDate: z.string(),
  }),
  transform,
})

const notes = defineCollection({
  name: "notes",
  directory: "content/notes",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    category: z.string(),
    lastUpdatedDate: z.string(),
  }),
  transform,
})

const authors = defineCollection({
  name: "authors",
  directory: "content/authors",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    avatar: z.string(),
    twitter: z.string(),
  }),
  transform,
})

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    published: z.boolean().default(true),
    date: z.string(),
    image: z.string(),
  }),
  transform,
})

export default defineConfig({
  collections: [posts],
})
