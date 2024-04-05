import Image from "next/image"
import { Mail } from "lucide-react"

import { Icons } from "@/components/app-icons"

export default function AboutContact() {
  return (
    <div className="flex flex-col-reverse gap-12 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-3">
        <p>
          {`Please do not hesitate to contact me if you have any queries or are interested in working with me!`}
        </p>
        <span>{"There are several ways to contact it:"}</span>
        <div className="mt-3 flex items-center gap-4">
          <a
            className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
            target="_blank"
            href="mailto:taitd.dev@gmail.com"
          >
            <Mail size={18} />
            <span>Mail</span>
          </a>

          <a
            className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
            target="_blank"
            href="https://github.com/trinhdinhtai"
          >
            <Icons.GitHub className="size-5" />
            <span>Github</span>
          </a>

          <a
            className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
            target="_blank"
            href="https://twitter.com/taitd_dev"
          >
            <Icons.Twitter className="size-5" />
            <span>Twitter</span>
          </a>

          <a
            className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
            target="_blank"
            href="https://www.facebook.com/taitd153"
          >
            <Icons.Facebook className="size-5" />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  )
}
