import { cn } from "@/lib/utils"

export default function StripeSeparator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "stripe-divider h-(--separator-height) w-full border-x border-line",
        className
      )}
    />
  )
}
