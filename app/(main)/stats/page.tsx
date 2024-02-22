"use client"

import { fadeContainer } from "@/constants/framer-motion-variants"

import { getGithubStats } from "@/lib/github"
import { getCodingHours } from "@/lib/wakatime"
import AnimatedDiv from "@/components/framer-motion/animated-div"
import PageHeading from "@/components/page-heading"
import StartCard from "@/components/stat-card"

export default async function StatsPage() {
  const [githubStats, codingHours] = await Promise.all([
    getGithubStats(),
    getCodingHours(),
  ])

  const { user, repos, starsCount } = githubStats || {}

  const statCards = [
    {
      title: "Github Repositories",
      value: repos,
      description: "Public repositories",
      link: `${user?.html_url}?tab=repositories`,
    },
    {
      title: "Github Stars",
      value: starsCount,
      description: "Total stars received",
      link: user?.html_url,
    },
    {
      title: "Github Followers",
      value: user?.followers,
      description: "People following me",
      link: user?.html_url,
    },

    {
      title: "Coding Hours",
      value: codingHours,
      description: "Total hours spent coding",
      link: "https://wakatime.com/",
    },
  ]

  return (
    <>
      <PageHeading
        title="Statistics"
        description="Insights into my digital life"
      />

      <AnimatedDiv
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        variants={fadeContainer}
      >
        {statCards.map((card) => (
          <StartCard key={card.title} card={card} />
        ))}
      </AnimatedDiv>
    </>
  )
}
