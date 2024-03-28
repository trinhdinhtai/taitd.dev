import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectLoadingPage() {
  return (
    <>
      <div className="space-y-1">
        <Skeleton className="h-8 w-[300px]" />
        <Skeleton className="h-7 w-[200px]" />
      </div>

      <hr className="my-6 md:my-4" />
    </>
  )
}
