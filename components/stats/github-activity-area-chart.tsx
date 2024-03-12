import { format, subDays } from "date-fns"
import { useTheme } from "next-themes"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ContributionsDay } from "@/types/github"
import ContributionsTooltip from "@/components/stats/contributions-tooltip"

interface GithubActivityAreaChartProps {
  contributionsByLast30Days?: ContributionsDay[]
}

export default function GithubActivityAreaChart({
  contributionsByLast30Days,
}: Readonly<GithubActivityAreaChartProps>) {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  function getChartLoadingData() {
    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), i)
      return {
        shortDate: format(date, "dd"),
        contributionCount: Math.floor(Math.random() * Math.floor(20)),
      }
    })

    return dates.reverse()
  }

  return (
    <div className="relative h-[300px] w-full">
      {contributionsByLast30Days ? (
        <ResponsiveContainer>
          <AreaChart
            width={730}
            height={250}
            data={contributionsByLast30Days}
            margin={{ top: 25, left: -30 }}
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
        </ResponsiveContainer>
      ) : (
        <>
          <div className="z-1 absolute inset-0 grid place-items-center font-semibold text-muted-foreground sm:text-lg">
            Loading Data...
          </div>
          <ResponsiveContainer>
            <AreaChart
              width={730}
              height={250}
              data={getChartLoadingData()}
              margin={{ top: 25, left: -30 }}
              className="pointer-events-none opacity-50"
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isDarkMode ? "#404040" : "#ababab"}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={isDarkMode ? "#404040" : "#ababab"}
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
              <Area
                dot
                activeDot
                strokeWidth={3}
                type="monotone"
                dataKey="contributionCount"
                aria-label="count"
                stroke={isDarkMode ? "#404040" : "#ababab"}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  )
}
