"use client"

import { useTheme } from "next-themes"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"

export default function GithubActivityGraph() {
  const { theme } = useTheme()

  return (
    <div className="mt-12">
      <div className="font-heading text-3xl font-bold capitalize text-neutral-900 dark:text-neutral-200 sm:text-4xl">
        GitHub Activity Graph
      </div>

      <div className="mb-4 text-muted-foreground">
        A dynamic representation of my GitHub activity of last 30 days.
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart></AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
