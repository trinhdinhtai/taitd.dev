import { USER } from "@/config/site"

import { JobItem } from "./overview/job-item"
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
      </PanelContent>
    </Panel>
  )
}
