import type { AvatarLightsVariants } from "@/components/features/portfolio/avatar-lights"

export type User = {
  displayName: string
  address: string
  timeZone: string
  phoneNumberB64: string
  emailB64: string
  website: string
  pronouns: string
  gender: string
  jobs: {
    title: string
    company: string
    website: string
    experienceId: string
  }[]
  flipSentences: string[]
  avatarVariants: AvatarLightsVariants
}
