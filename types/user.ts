import type { AvatarLightsVariants } from "@/components/features/portfolio/avatar-lights"

export type User = {
  displayName: string
  jobs: {
    title: string
    company: string
    website: string
    experienceId: string
  }[]
  flipSentences: string[]
  avatarVariants: AvatarLightsVariants
}
