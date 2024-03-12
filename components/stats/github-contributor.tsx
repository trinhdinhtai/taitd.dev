"use client"

import { useTheme } from "next-themes"
import GitHubCalendar from "react-github-calendar"

import GithubActivityGraph from "@/components/stats/github-activity-graph"

export default function GithubContributor() {
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-12">
      <div className="font-heading text-3xl font-bold capitalize text-neutral-900 dark:text-neutral-200 sm:text-4xl">
        GitHub Contributor
      </div>
      <div className="text-muted-foreground">
        The following is my GitHub contribution graph which shows my coding
        activity and productivity on the platform.
      </div>

      <div className="mt-8 space-y-8">
        <div className="font-heading text-xl font-bold capitalize text-neutral-900 dark:text-neutral-200 sm:text-2xl">
          In {currentYear}
        </div>
        <GitHubCalendar
          username="trinhdinhtai"
          year={currentYear}
          style={{
            width: "100% !important",
            marginTop: "20px",
          }}
          colorScheme={theme === "dark" ? "dark" : "light"}
        />
        <GithubActivityGraph />
      </div>
    </div>
  )
}
