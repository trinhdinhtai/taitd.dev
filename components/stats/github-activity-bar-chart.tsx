import { format, subDays } from "date-fns"
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

import { ContributionCountByDayOfWeek } from "@/lib/github"
import ContributionCountByDayOfWeekToolTip from "@/components/stats/contribution-count-by-day-of-week-tooltip"

interface GithubActivityBarChartProps {
  contributionCountByDayOfWeek?: ContributionCountByDayOfWeek[]
}

export default function GithubActivityBarChart({
  contributionCountByDayOfWeek,
}: Readonly<GithubActivityBarChartProps>) {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  const barGraphLoadingData = [
    { day: "Monday", count: 16 },
    { day: "Tuesday", count: 13 },
    { day: "Wednesday", count: 4 },
    { day: "Thursday", count: 6 },
    { day: "Friday", count: 9 },
    { day: "Saturday", count: 12 },
    { day: "Sunday", count: 1 },
  ]

  return (
    <div className="relative h-[300px] w-full">
      {contributionCountByDayOfWeek ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={730}
            height={250}
            data={contributionCountByDayOfWeek}
            margin={{ top: 25, left: -30 }}
          >
            <CartesianGrid
              strokeDasharray="2 3"
              stroke={isDarkMode ? "#ffffff20" : "#00000020"}
            />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              cursor={{ fill: isDarkMode ? "#ffffff20" : "#00000020" }}
              content={<ContributionCountByDayOfWeekToolTip />}
            />
            <Bar dataKey="count" fill="#26a641" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <>
          <div className="z-1 absolute inset-0 grid place-items-center font-semibold text-muted-foreground sm:text-lg">
            Loading Data...
          </div>
          <ResponsiveContainer>
            <BarChart
              width={730}
              height={250}
              data={barGraphLoadingData}
              margin={{ top: 25, left: -30 }}
              className="pointer-events-none opacity-50"
            >
              <CartesianGrid
                strokeDasharray="2 3"
                stroke={isDarkMode ? "#ffffff20" : "#00000020"}
              />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                cursor={{ fill: isDarkMode ? "#ffffff20" : "#00000020" }}
                content={<ContributionCountByDayOfWeekToolTip />}
              />
              <Bar dataKey="count" fill={isDarkMode ? "#404040" : "#ababab"} />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  )
}
