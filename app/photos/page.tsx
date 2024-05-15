import { Metadata } from "next"
import Image from "next/image"

import PageHeading from "@/components/page-heading"
import Photos from "@/components/photos"

export const metadata: Metadata = {
  title: "Photos",
  metadataBase: new URL("https://taitd.io.vn/photos"),
  description: "Explore photos taken by me.",
}

export default function PhotosPage() {
  return (
    <>
      <PageHeading
        title="Photos"
        description="This page is still under construction..."
      />

      <figure className="my-6">
        <Photos />
      </figure>
    </>
  )
}
