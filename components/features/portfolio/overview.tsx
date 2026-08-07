import { MapPinIcon } from "lucide-react"

import { USER } from "@/config/site"

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
import { Panel, PanelContent } from "./panel"

export function Overview() {
  return (
    <Panel>
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
      </PanelContent>
    </Panel>
  )
}
