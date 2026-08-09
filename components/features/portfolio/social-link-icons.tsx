import type { SocialName } from "@/config/site"
import {
  DailyDotDevIcon,
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons"

/**
 * Presentation binding for social profiles. Kept separate from the social
 * data so the data layer stays JSX-free. Keyed by `SocialName` so it stays
 * exhaustive with the registry.
 */
export const SOCIAL_ICONS: Record<SocialName, React.JSX.Element> = {
  x: <XIcon />,
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  dailydotdev: <DailyDotDevIcon />,
}
