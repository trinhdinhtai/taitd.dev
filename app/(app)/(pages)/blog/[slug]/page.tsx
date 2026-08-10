import type { Route } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { findNeighbor, getBlogPosts, getDocBySlug } from "@/features/content"
import { DocKeyboardShortcuts } from "@/features/content/components/doc-keyboard-shortcuts"
import {
  DocContainer,
  DocContentCol,
  DocGrid,
  DocLeftCol,
  DocRightCol,
} from "@/features/content/components/doc-layout"
import { DocPageRoot } from "@/features/content/components/doc-page-root"

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const slug = (await params).slug
  const doc = getDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  const { title, description, image, createdAt, updatedAt } = doc.metadata

  const allDocs = getBlogPosts()
  const { previous, next } = findNeighbor(allDocs, slug)

  return (
    <>
      <DocKeyboardShortcuts
        previous={previous ? (`/blog/${previous.slug}` as Route) : null}
        next={next ? (`/blog/${next.slug}` as Route) : null}
      />

      <DocPageRoot>
        <DocContainer>
          <div className="screen-line-bottom h-px" />

          <div className="flex items-center justify-between p-2 pl-4">
            <Button
              className="h-7 gap-2 border-none px-0 tracking-wider text-muted-foreground hover:text-foreground hover:no-underline"
              variant="link"
              size="sm"
              nativeButton={false}
              render={
                <Link href="/blog">
                  <ArrowLeftIcon />
                  Blog
                </Link>
              }
            />
          </div>

          <div className="screen-line-top screen-line-bottom py-px">
            <div className="h-4" />
          </div>

          <h1
            data-slot="doc-title"
            className="screen-line-bottom px-4 py-2 text-4xl font-medium tracking-tight text-balance"
          >
            {doc.metadata.title}
          </h1>
        </DocContainer>

        <DocGrid>
          <DocLeftCol />

          <DocContentCol>{/* TODO: Add content */}</DocContentCol>

          <DocRightCol>{/* TODO: Add TOCMinimap */}</DocRightCol>
        </DocGrid>
      </DocPageRoot>
    </>
  )
}
