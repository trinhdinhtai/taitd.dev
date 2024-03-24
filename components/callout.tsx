import { AlertCircle, AlertTriangle, Skull } from "lucide-react"

import { cn } from "@/lib/utils"

const calloutVariants = {
  default: {
    icon: AlertCircle,
    title: "Note",
    styles: "bg-teal-100 text-teal-950 dark:bg-teal-950 dark:text-teal-50",
  },
  danger: {
    icon: Skull,
    title: "Danger",
    styles: "bg-red-100 text-red-950 dark:bg-red-950 dark:text-red-50",
  },
  warning: {
    icon: AlertTriangle,
    title: "Warning",
    styles:
      "bg-yellow-100 text-yellow-950 dark:bg-yellow-950 dark:text-yellow-50",
  },
}

interface CalloutProps {
  children?: React.ReactNode
  variant?: "default" | "warning" | "danger"
}

export function Callout({
  children,
  variant = "default",
  ...props
}: Readonly<CalloutProps>) {
  const { icon: Icon, styles, title } = calloutVariants[variant]
  return (
    <div
      className={cn(
        "not-prose my-3 mt-4 rounded-md border md:p-3 lg:p-4",
        styles
      )}
      {...props}
    >
      <p className="flex items-center gap-2 pb-4">
        <Icon />
        <span className="font-medium">{title}</span>
      </p>
      <div className="space-y-4 text-current">{children}</div>
    </div>
  )
}
