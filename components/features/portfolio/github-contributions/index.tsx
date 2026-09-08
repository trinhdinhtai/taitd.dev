import { Suspense } from "react"
import { getGitHubContributions } from "@/data/github-contributions"

import { Panel } from "../../../../features/portfolio/components/panel"
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph"

export function GitHubContributions() {
  const contributions = getGitHubContributions()

  return (
    <Panel className="screen-line-bottom-none screen-line-top-none">
      <h2 className="sr-only">GitHub Contributions</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph contributions={contributions} />
      </Suspense>

      <div className="h-px" />
    </Panel>
  )
}
