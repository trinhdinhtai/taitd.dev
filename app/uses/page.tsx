import { Metadata } from "next"

import PageHeading from "@/components/page-heading"
import Uses from "@/components/uses"

export const metadata: Metadata = {
  title: "Uses",
}

const UsesPage = () => {
  return (
    <>
      <PageHeading
        title="Uses"
        description="These are the tools I use to get my work done. Links marked with (*)
        are affiliate links. It does not cost you anything to use them, but
        I get a small commission if you do."
      />

      <Uses />
    </>
  )
}

export default UsesPage
