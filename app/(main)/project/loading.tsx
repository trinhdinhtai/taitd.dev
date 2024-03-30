import { Metadata } from "next"

import { Skeleton } from "@/components/ui/skeleton"
import PageHeading from "@/components/page-heading"

export const metadata: Metadata = {
  title: "Projects",
}

export default function ProjectLoading() {
  return (
    <>
      <div className="space-y-1">
        <Skeleton className="h-[36px] w-[300px] md:h-10" />
        <Skeleton className="h-7 w-[200px]" />
      </div>

      <hr className="my-6 md:my-4" />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg border bg-background p-4 dark:bg-gray-900"
          >
            <Skeleton className="aspect-[2/1] w-full rounded-md" />

            <div className="mt-4 flex h-full flex-1 flex-col gap-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-[60px] w-full sm:h-20 md:h-[60px]" />
              <div className="mt-auto flex items-center gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-12" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
