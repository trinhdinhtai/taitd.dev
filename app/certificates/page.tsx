import { Metadata } from "next"
import { db } from "@/server/db"

import Certificates from "@/components/certificates"
import PageHeading from "@/components/page-heading"

export const metadata: Metadata = {
  title: "Certificates",
}

export default async function CertificatesPage() {
  const certificates = await db.certificate.findMany({
    orderBy: {
      issueDate: "desc",
    },
  })

  return (
    <>
      <PageHeading
        title="Certificates"
        description="My certificates and achievements."
      />

      <Certificates certificates={certificates} />
    </>
  )
}
