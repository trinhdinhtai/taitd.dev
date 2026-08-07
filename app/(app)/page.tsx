import { Overview } from "@/components/features/portfolio/overview"
import { ProfileHeader } from "@/components/features/portfolio/profile-header"
import StripeSeparator from "@/components/stripe-separator"

export default function HomePage() {
  return (
    <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
      <div className="mx-auto md:max-w-4xl">
        <ProfileHeader />
        <StripeSeparator />

        <Overview />
      </div>
    </div>
  )
}
