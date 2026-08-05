/**
 * Minimal doc data for client components that don't need the full content.
 * Reduces serialization overhead and bundle size.
 */
export type DocPreview = {
  slug: string
  title: string
  category?: string
}
