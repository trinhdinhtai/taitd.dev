import { formatDate } from "@/utils/date"
import { urlToName } from "@/utils/url"
import {
  CakeIcon,
  LinkIcon,
  MapPinIcon,
  MarsIcon,
  NonBinaryIcon,
  VenusIcon,
} from "lucide-react"

import type { User } from "@/types/user"
import { USER } from "@/config/site"

import {
  Panel,
  PanelContent,
} from "../../../features/portfolio/components/panel"
import { CurrentLocalTimeItem } from "./overview/current-local-time-item"
import { EmailItem } from "./overview/email-item"
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./overview/intro-item"
import { JobItem } from "./overview/job-item"
import { PhoneItem } from "./overview/phone-item"

function getGenderIcon(gender: User["gender"]) {
  switch (gender) {
    case "male":
      return <MarsIcon />
    case "female":
      return <VenusIcon />
    case "non-binary":
      return <NonBinaryIcon />
  }
}

export function Overview() {
  const dateOfBirth = formatDate(USER.dateOfBirth)

  return (
    <Panel className="screen-line-bottom-none">
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
        {USER.jobs.map((job, index) => {
          return (
            <JobItem
              key={index}
              title={job.title}
              company={job.company}
              website={job.website}
              experienceId={job.experienceId}
            />
          )
        })}

        <IntroItem>
          <IntroItemIcon>
            <MapPinIcon />
          </IntroItemIcon>
          <IntroItemContent>
            <IntroItemLink
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
              aria-label={`Location: ${USER.address}`}
            >
              {USER.address}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem>

        <CurrentLocalTimeItem timeZone={USER.timeZone} />

        <PhoneItem phoneNumberB64={USER.phoneNumberB64} />

        <EmailItem emailB64={USER.emailB64} />

        <IntroItem>
          <IntroItemIcon>
            <LinkIcon />
          </IntroItemIcon>
          <IntroItemContent>
            <IntroItemLink
              href={USER.website}
              aria-label={`Personal website: ${urlToName(USER.website)}`}
            >
              {urlToName(USER.website)}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem>

        <IntroItem>
          <IntroItemIcon>
            <CakeIcon />
          </IntroItemIcon>
          <IntroItemContent aria-label={`Date of birth: ${dateOfBirth}`}>
            {dateOfBirth}
          </IntroItemContent>
        </IntroItem>

        <IntroItem>
          <IntroItemIcon>{getGenderIcon(USER.gender)}</IntroItemIcon>
          <IntroItemContent aria-label={`Pronouns: ${USER.pronouns}`}>
            {USER.pronouns}
          </IntroItemContent>
        </IntroItem>
      </PanelContent>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-1 w-px -translate-x-2.25 border-r border-dashed border-line max-sm:hidden" />
    </Panel>
  )
}
