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
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
    >
      {children}
    </div>
  )
}

export default ComponentPreview
