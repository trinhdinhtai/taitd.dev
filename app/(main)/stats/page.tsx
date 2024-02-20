import { getGithubStats } from "@/lib/github"
import PageHeading from "@/components/page-heading"
import StartCard from "@/components/stat-card"

export default async function StatsPage() {
  const githubStats = await getGithubStats()

  if (!githubStats) return null

  const { user, repos, starsCount } = githubStats

  const statCards = [
    {
      title: "Github Stars",
      value: starsCount,
      description: "Total stars received",
      link: user.html_url,
    },
    {
      title: "Github Followers",
      value: user.followers,
      description: "People following me",
      link: user.html_url,
    },
  ]

  return (
    <>
      <PageHeading
        title="Statistics"
        description="Insights into my digital life"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {statCards.map((card) => (
          <StartCard key={card.title} card={card} />
        ))}
      </div>
    </>
  )
}
