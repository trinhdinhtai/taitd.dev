import { cn } from "@/lib/utils"
import StripeSeparator from "@/components/stripe-separator"

export function DocContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="doc-container"
      className={cn(
        "mx-auto w-full border-x border-line md:max-w-4xl",
        className
      )}
      {...props}
    />
  )
}

export function DocGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="doc-grid"
      className={cn(
        "mx-auto grid w-full grid-cols-1 lg:grid-cols-[1fr_var(--container-4xl)_1fr]",
        className
      )}
      {...props}
    />
  )
}

export function DocLeftCol({
  className,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="doc-left-col"
      className={cn("max-lg:hidden", className)}
      {...props}
    />
  )
}

export function DocContentCol({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DocContainer>) {
  return (
    <div
      data-slot="doc-content-col"
      className="mx-auto flex w-full md:max-w-4xl"
    >
      <StripeSeparator
        orientation="vertical"
        className="hidden shrink-0 sm:block"
      />
      <div className={cn("min-w-0 flex-1", className)} {...props}>
        {children}
      </div>
      <StripeSeparator
        orientation="vertical"
        className="hidden shrink-0 sm:block"
      />
    </div>
  )
}

export function DocRightCol({
  className,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="doc-right-col"
      className={cn("max-lg:hidden", className)}
      {...props}
    />
  )
}
