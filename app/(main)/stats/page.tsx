import GithubActivityGraph from "@/components/github-activity-graph"
import PageHeading from "@/components/page-heading"
import Stats from "@/components/stats"
import GithubContributor from "@/components/stats/github-contributor"

export default function StatsPage() {
  return (
    <>
      <PageHeading
        title="Statistics"
        description="Insights into my digital life"
      />

      <Stats />
      <GithubContributor />
      <GithubActivityGraph />
    </>
  )
}
