import { Overview } from "@/components/features/portfolio/overview"
import { ProfileHeader } from "@/components/features/portfolio/profile-header"
import StripeSeparator from "@/components/stripe-separator"

export default function HomePage() {
  return (
    <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
      <div className="mx-auto flex min-h-[calc(100svh-var(--header-height))] items-stretch md:max-w-3xl">
        <StripeSeparator orientation="vertical" />

        <div className="min-w-0 flex-1">
          <ProfileHeader />
          <StripeSeparator />
          <Overview />
        </div>

        <StripeSeparator orientation="vertical" />
      </div>
    </div>
  )
}
