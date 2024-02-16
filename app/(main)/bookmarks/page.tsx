import { Metadata } from "next"

import PageHeading from "@/components/page-heading"

export const metadata: Metadata = {
  title: "Bookmarks",
}

export default function BookmarkPage() {
  return (
    <>
      <PageHeading
        title="Bookmarks"
        description="My collection of bookmarks."
      />
    </>
  )
}
