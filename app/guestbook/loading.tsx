import { Skeleton } from "@/components/ui/skeleton"

export default function GuestbookLoadingPage() {
  return (
    <>
      <div className="space-y-1">
        <Skeleton className="h-[36px] w-[300px] md:h-10" />
        <Skeleton className="h-7 w-[200px]" />
      </div>

      <hr className="my-6 md:my-4" />

      <div className="mt-10 flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3 px-3">
            <Skeleton className="size-10 rounded-full" />

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-8" />
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="flex min-h-8 items-center gap-4">
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
