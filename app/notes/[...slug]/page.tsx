import { notFound } from "next/navigation"
import { allNotes, allSnippets } from "content-collections"

import { formatDate } from "@/lib/utils"
import Mdx from "@/components/mdx/mdx-components"

import "@/styles/mdx.css"

import { Metadata } from "next"

import { env } from "@/env"

const BASE_URL = env.NEXT_PUBLIC_APP_URL

interface NotePageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const note = await getNoteFromParams(params)

  if (!note) {
    return {}
  }

  const { title, description } = note

  const ogUrl = new URL(`${BASE_URL}/api/og`)
  ogUrl.searchParams.set("heading", title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: title,
    description: description,
  }
}

async function getNoteFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/")
  const note = allNotes.find((note) => note.slug === slug)

  return note
}

export default async function NotePage({ params }: NotePageProps) {
  const snippet = await getNoteFromParams(params)

  if (!snippet) {
    notFound()
  }

  return (
    <article className="relative lg:gap-10 xl:grid xl:max-w-6xl">
      <div className="w-full min-w-0">
        <div className="mb-6">
          <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
            {snippet.title}
          </h1>

          <div className="mt-4 flex space-x-2 text-lg text-muted-foreground">
            {snippet.lastUpdatedDate && (
              <time dateTime={snippet.lastUpdatedDate}>
                {formatDate(snippet.lastUpdatedDate)}
              </time>
            )}
          </div>
        </div>

        <Mdx code={snippet.code} />
      </div>
    </article>
  )
}
