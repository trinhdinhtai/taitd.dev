import { cn } from "@/lib/utils"

type StripeSeparatorProps = {
  className?: string
  orientation?: "horizontal" | "vertical"
}

export default function StripeSeparator({
  className,
  orientation = "horizontal",
}: StripeSeparatorProps) {
  return (
    <div
      data-slot="stripe-separator"
      data-orientation={orientation}
      className={cn(
        "border-line",
        orientation === "horizontal"
          ? "stripe-divider-horizontal"
          : "stripe-divider-vertical border-x",
        className
      )}
    />
  )
}
