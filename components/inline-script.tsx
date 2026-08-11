"use client"

export function InlineScript({ html }: { html: string }) {
  return (
    <script
      // React also warns in development when rendering produces <script> tags.
      // To avoid this, wrap the script in a helper that sets type="text/javascript"
      // on the server and type="text/plain" on the client.
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
