import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectLoadingPage() {
  return (
    <>
      <div className="space-y-1">
        <Skeleton className="h-[36px] w-[300px] md:h-10" />
        <Skeleton className="h-7 w-[200px]" />
      </div>

      <hr className="my-6 md:my-4" />

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-[22.5px] w-20" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-5" />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-20" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </div>

        <Skeleton className="aspect-[16/9] w-full" />

        <div className="mt-5 space-y-6">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </>
  )
}
