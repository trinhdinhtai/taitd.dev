import { notFound } from "next/navigation"
import { allSnippets } from "content-collections"

import { formatDate } from "@/lib/utils"
import Mdx from "@/components/mdx/mdx-components"

import "@/styles/mdx.css"

import { Metadata } from "next"

import { env } from "@/env"

const BASE_URL = env.NEXT_PUBLIC_APP_URL

interface SnippetPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({
  params,
}: SnippetPageProps): Promise<Metadata> {
  const post = await getSnippetFromParams(params)

  if (!post) {
    return {}
  }

  const { title, description } = post

  const ogUrl = new URL(`${BASE_URL}/api/og`)
  ogUrl.searchParams.set("heading", title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: title,
    description: description,
  }
}

async function getSnippetFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/")
  const snippet = allSnippets.find((snippet) => snippet.slugAsParams === slug)

  return snippet
}

const SnippetPage = async ({ params }: SnippetPageProps) => {
  const snippet = await getSnippetFromParams(params)

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

        <Mdx code={snippet.body.code} />
      </div>
    </article>
  )
}

export default SnippetPage
