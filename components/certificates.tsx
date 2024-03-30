import Image from "next/image"
import { Certificate } from "@prisma/client"

interface CertificatesProps {
  certificates: Certificate[]
}

export default function Certificates({ certificates }: CertificatesProps) {
  return (
    <div className="space-y-3">
      {certificates.map((certificate) => (
        <div key={certificate.title} className="flex items-center space-x-3">
          <Image
            src={certificate.organizationLogoUrl}
            alt={certificate.organizationName}
            width={40}
            height={40}
            className="h-12 w-12"
          />
          <div>
            <a
              href={certificate.url}
              className="font-medium underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {certificate.title}
            </a>
            <div className="text-sm text-gray-500"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
