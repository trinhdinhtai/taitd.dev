import StripeSeparator from "@/components/stripe-separator"

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex border-line md:max-w-4xl">
      <StripeSeparator orientation="vertical" className="hidden sm:block" />
      <div className="min-w-0 flex-1 pt-12">{children}</div>
      <StripeSeparator orientation="vertical" className="hidden sm:block" />
    </div>
  )
}
