import { ImageResponse } from "next/server"
import { allPosts } from "contentlayer/generated"
import { format, parseISO } from "date-fns"

import { siteConfig } from "@/config/site"

export const runtime = "edge"

export const alt = `Article by ${siteConfig.name}`
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {}
  }

  const date = post.date

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background:
            "linear-gradient(45deg, rgba(59, 178, 93, 0.20) 0%, rgba(59, 121, 178, 0.20) 100%)",
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "flex-start",
          flexDirection: "column",
          justifyContent: "space-between",
          letterSpacing: "-.02em",
          padding: "64px 48px",
          color: "#222",
        }}
      >
        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 400,
            }}
          >
            {siteConfig.handle}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "auto",
            maxWidth: "70%",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "48px",
              lineHeight: 1.1,
            }}
          >
            {post.title}
          </p>

          <p
            style={{
              fontSize: "20px",
            }}
          >
            {format(parseISO(date), "LLLL d, yyyy")} &middot; {78} min read
          </p>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
