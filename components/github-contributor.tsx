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

      <div className="my-4 text-muted-foreground">
        The following is my GitHub contribution graph which shows my coding
        activity and productivity on the platform.
      </div>

      <GitHubCalendar
        username="trinhdinhtai"
        year={new Date().getFullYear()}
        style={{
          width: "100% !important",
          marginTop: "40px",
        }}
        colorScheme={theme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}
