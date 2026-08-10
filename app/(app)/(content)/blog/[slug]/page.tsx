import type { Route } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTableOfContents } from "fumadocs-core/content/toc"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipContent } from "@/components/base/ui/tooltip"
import { Prose } from "@/components/base/ui/typography"
import { MDX } from "@/components/mdx"
import { TOCInline } from "@/components/toc-inline"
import { TOCMinimap } from "@/components/toc-minimap"
import { findNeighbor, getBlogPosts, getDocBySlug } from "@/features/content"
import { DocKeyboardShortcuts } from "@/features/content/components/doc-keyboard-shortcuts"
import {
  DocContentCol,
  DocRightCol,
} from "@/features/content/components/doc-layout"

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const slug = (await params).slug
  const doc = getDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  const { title } = doc.metadata

  const allDocs = getBlogPosts()
  const { previous, next } = findNeighbor(allDocs, slug)

  const toc = getTableOfContents(doc.content)

  return (
    <>
      <DocContentCol>
        <DocKeyboardShortcuts
          previous={previous ? (`/blog/${previous.slug}` as Route) : null}
          next={next ? (`/blog/${next.slug}` as Route) : null}
        />

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

          {previous && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    className="size-7 border-none"
                    variant="secondary"
                    size="icon-sm"
                    nativeButton={false}
                    render={
                      <Link
                        href={`/blog/${previous.slug}`}
                        aria-label="Previous Component"
                      >
                        <ArrowLeftIcon />
                      </Link>
                    }
                  />
                }
              />
              <TooltipContent className="pr-2 pl-3">
                <div className="flex items-center gap-3">
                  Previous component
                  <Kbd>
                    <ArrowLeftIcon />
                  </Kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          )}

          {next && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    className="size-7 border-none"
                    variant="secondary"
                    size="icon-sm"
                    nativeButton={false}
                    render={
                      <Link
                        href={`/blog/${next.slug}`}
                        aria-label="Next component"
                      >
                        <ArrowRightIcon />
                      </Link>
                    }
                  />
                }
              />
              <TooltipContent className="pr-2 pl-3">
                <div className="flex items-center gap-3">
                  Next component
                  <Kbd>
                    <ArrowRightIcon />
                  </Kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className="screen-dashed-line-top screen-dashed-line-bottom before:opacity-80 after:opacity-80">
          <div className="screen-line-top screen-line-bottom overflow-x-clip py-px">
            <div className="h-4" />
          </div>
        </div>

        <div className="screen-dashed-line-bottom after:opacity-80">
          <h1
            data-slot="doc-title"
            className="screen-line-bottom overflow-x-clip px-4 py-2 text-4xl font-medium tracking-tight text-balance"
          >
            {title}
          </h1>
        </div>

        <Prose className="px-(--page-padding) pt-8 [--page-padding:--spacing(4)]">
          <TOCInline className="lg:hidden" items={toc} />

          <div>
            <MDX code={doc.content} />
          </div>
        </Prose>
        <div className="screen-line-top h-4" />
      </DocContentCol>

      <DocRightCol>
        <div className="sticky top-[calc(var(--doc-cols-top,0)+(--spacing(3)))] translate-x-2 opacity-0 in-data-doc-cols-ready:opacity-100">
          <TOCMinimap items={toc} />
        </div>
      </DocRightCol>
    </>
  )
}
