import { cn } from "@/lib/utils"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
}

const ComponentPreview = ({
  name,
  children,
  extractClassname,
  extractedClassNames,
  align = "center",
  className,
  ...props
}: ComponentPreviewProps) => {
  return (
    <div
      {...props}
      className={cn("flex justify-center rounded-lg border p-8", className)}
    >
      {children}
    </div>
  )
}

export default ComponentPreview
