"use client"

import { useQuery } from "@tanstack/react-query"
import { useTheme } from "next-themes"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ContributionsDay } from "@/types/github"
import ContributionsTooltip from "@/components/stats/contributions-tooltip"

export default function GithubActivityGraph() {
  const { theme } = useTheme()
  const { data: contributions } = useQuery({
    queryKey: ["githubActivityData"],
    queryFn: () =>
      fetch("/api/stats/github/activity").then((res) => res.json()),
  })

  const isDarkMode = theme === "dark"

  const contributionsByLast30Days =
    contributions?.contributionsByLast30Days as ContributionsDay[]

  return (
    <div className="mt-12">
      <div className="font-heading text-xl font-bold capitalize text-neutral-900 dark:text-neutral-200 sm:text-2xl">
        In Last 30 Days
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {contributionsByLast30Days ? (
          <AreaChart
            width={730}
            height={250}
            data={contributionsByLast30Days}
            margin={{ top: 15, left: -30 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isDarkMode ? "#26a64160" : "#26a641"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={isDarkMode ? "#26a64160" : "#26a641"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="shortDate" />
            <YAxis />
            <CartesianGrid
              strokeDasharray="2 3"
              stroke={isDarkMode ? "#ffffff20" : "#00000020"}
            />
            <Tooltip content={<ContributionsTooltip />} />
            <Area
              dot
              activeDot
              strokeWidth={3}
              type="monotone"
              dataKey="contributionCount"
              aria-label="count"
              stroke={isDarkMode ? "#26a641" : "#216e39"}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        ) : (
          <></>
        )}
      </ResponsiveContainer>
    </div>
  )
}
