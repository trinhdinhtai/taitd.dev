"use client"

import { useQuery } from "@tanstack/react-query"

import { ContributionsDay } from "@/types/github"
import { ContributionCountByDayOfWeek } from "@/lib/github"
import GithubActivityAreaChart from "@/components/stats/github-activity-area-chart"
import GithubActivityBarChart from "@/components/stats/github-activity-bar-chart"

export default function GithubActivityGraph() {
  const { data: contributions } = useQuery({
    queryKey: ["githubActivityData"],
    queryFn: () =>
      fetch("/api/stats/github/activity").then((res) => res.json()),
  })

  const contributionsByLast30Days =
    contributions?.contributionsByLast30Days as ContributionsDay[]

  const contributionCountByDayOfWeek =
    contributions?.contributionCountByDayOfWeek as ContributionCountByDayOfWeek[]

  return (
    <div className="mt-12">
      <div className="font-heading text-xl font-bold capitalize text-neutral-900 dark:text-neutral-200 sm:text-2xl">
        In Last 30 Days
      </div>

      <GithubActivityAreaChart
        contributionsByLast30Days={contributionsByLast30Days}
      />

      <div className="font-heading text-xl font-bold capitalize text-neutral-900 dark:text-neutral-200 sm:text-2xl">
        Productivity by day of week
      </div>

      <GithubActivityBarChart
        contributionCountByDayOfWeek={contributionCountByDayOfWeek}
      />
    </div>
  )
}
