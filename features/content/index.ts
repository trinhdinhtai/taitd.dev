import fs from "fs"
import path from "path"
import { cache } from "react"
import matter from "gray-matter"

import type { Doc, DocMetadata } from "@/features/content/types/document"

/** Categories derived from the doc's content subfolder. */
export const BLOG_CATEGORY = "blog"
export const COMPONENTS_CATEGORY = "components"

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent)

  return {
    metadata: file.data as DocMetadata,
    content: file.content,
  }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx")
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return parseFrontmatter(rawContent)
}

/**
 * Reads MDX docs from `dir`, grouping them by their immediate subfolder.
 * The subfolder name is the doc's category (e.g. `content/components/*.mdx`
 * yields docs with `category: "components"`), so category is derived from the
 * file location rather than declared in frontmatter. Files placed directly in
 * `dir` (e.g. shared `props.ts`) are ignored — only category folders are read.
 */
function getMDXData(dir: string) {
  const categoryDirs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())

  return categoryDirs.flatMap((categoryDir) => {
    const category = categoryDir.name
    const categoryPath = path.join(dir, category)

    return getMDXFiles(categoryPath).map<Doc>((file) => {
      const { metadata, content } = readMDXFile(path.join(categoryPath, file))

      const slug = path.basename(file, path.extname(file))

      return {
        metadata: { ...metadata, category },
        slug,
        content,
      }
    })
  })
}

export const getAllDocs = cache(() => {
  return getMDXData(path.join(process.cwd(), "content")).sort((a, b) => {
    if (a.metadata.pinned && !b.metadata.pinned) return -1
    if (!a.metadata.pinned && b.metadata.pinned) return 1

    return (
      new Date(b.metadata.createdAt).getTime() -
      new Date(a.metadata.createdAt).getTime()
    )
  })
})

export function getDocsByCategory(category: string) {
  return getAllDocs().filter((doc) => doc.metadata?.category === category)
}

/** Blog posts — docs under the `blog/` content folder. */
export function getBlogPosts() {
  return getDocsByCategory(BLOG_CATEGORY)
}
