import { GitHubContributions } from "@/components/features/portfolio/github-contributions"
import { Overview } from "@/components/features/portfolio/overview"
import { ProfileHeader } from "@/components/features/portfolio/profile-header"
import SocialLinks from "@/components/features/portfolio/social-links"
import StripeSeparator from "@/components/stripe-separator"
import { Blog } from "@/features/portfolio/components/blog"
import { Hello } from "@/features/portfolio/components/hello"
import { TechStack } from "@/features/portfolio/components/tech-stack"

export default function HomePage() {
  return (
    <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
      <div className="mx-auto flex min-h-[calc(100svh-var(--header-height))] items-stretch md:max-w-4xl">
        <StripeSeparator orientation="vertical" />

        <div className="min-w-0 flex-1">
          <ProfileHeader />
          <StripeSeparator />
          <Overview />
          <SocialLinks />
          <GitHubContributions />
          <StripeSeparator />
          <Hello />
          <StripeSeparator />
          <Blog />
          <StripeSeparator />
          <TechStack />
        </div>

        <StripeSeparator orientation="vertical" />
      </div>
    </div>
  )
}
