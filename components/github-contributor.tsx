"use client"

import { useTheme } from "next-themes"
import GitHubCalendar from "react-github-calendar"

export default function GithubContributor() {
  const { theme } = useTheme()

  return (
    <div className="my-6">
      <div className="font-heading text-3xl font-bold capitalize text-neutral-900 dark:text-neutral-200 sm:text-4xl">
        GitHub Contributor
      </div>

      <GitHubCalendar
        style={{
          width: "100% !important",
        }}
        username="trinhdinhtai"
        colorScheme={theme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}
