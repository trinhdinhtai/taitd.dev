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
        "shrink-0 border-line",
        orientation === "horizontal"
          ? "stripe-divider-horizontal border-y"
          : "stripe-divider-vertical border-x",
        className
      )}
    />
  )
}
