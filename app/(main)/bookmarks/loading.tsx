import { Skeleton } from "@/components/ui/skeleton"

export default function BookmarksLoadingPage() {
  return (
    <>
      <div className="space-y-1">
        <Skeleton className="h-[36px] w-[300px] md:h-10" />
        <Skeleton className="h-7 w-[200px]" />
      </div>

      <hr className="my-6 md:my-4" />

      <div className="divide-y">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1 px-2 py-3">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-36" />
          </div>
        ))}
      </div>
    </>
  )
}
