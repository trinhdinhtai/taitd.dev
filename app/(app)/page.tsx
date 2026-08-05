import { ProfileHeader } from "@/components/features/portfolio/profile-header"

export default function HomePage() {
  return (
    <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
      <div className="mx-auto md:max-w-4xl">
        <ProfileHeader />
      </div>
    </div>
  )
}
