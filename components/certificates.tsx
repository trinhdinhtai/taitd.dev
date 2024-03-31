"use client"

import Image from "next/image"
import Link from "next/link"
import {
  popUpFromBottomForText,
  slideInWithFadeOut,
} from "@/constants/framer-motion-variants"
import { Certificate } from "@prisma/client"
import { motion } from "framer-motion"

import { formatDate } from "@/lib/utils"

interface CertificatesProps {
  certificates: Certificate[]
}

export default function Certificates({ certificates }: CertificatesProps) {
  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      animate="visible"
      variants={slideInWithFadeOut}
    >
      {certificates.map((certificate) => (
        <div
          key={certificate.id}
          className="z-[100] flex items-center gap-3 rounded-lg border bg-background p-3 dark:bg-secondary"
        >
          <div className="relative flex items-center justify-center">
            <Image
              src={certificate.organizationLogoUrl}
              alt={certificate.organizationName}
              width={40}
              height={40}
              className="h-12 w-12"
            />
          </div>

          <div className="flex flex-col">
            <Link
              href={certificate.url}
              className="text-sm font-semibold text-neutral-900 hover:underline dark:text-neutral-200 sm:text-base md:text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {certificate.title}
            </Link>

            <p className="text-xs text-muted-foreground">
              {certificate.organizationName} &#x2022;{" "}
              {formatDate(certificate.issueDate.toString())}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
