"use client"

import { Percentage } from "@/types/wakatime"
import { Progress } from "@/components/ui/progress"

interface CodingProgressProps {
  languages: Percentage[]
  operatingSystems: Percentage[]
}

export default function CodingProgress({
  languages,
  operatingSystems,
}: Readonly<CodingProgressProps>) {
  const progresses = [
    {
      title: "Languages",
      data: languages,
    },
    {
      title: "Operating Systems",
      data: operatingSystems,
    },
  ]
  return (
    <div className="mt-12">
      <div className="font-heading text-3xl font-bold capitalize text-neutral-900 dark:text-neutral-200 sm:text-4xl">
        Coding Statistics
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-16">
        {progresses.map(({ title, data }) => (
          <div
            key={title}
            className="relative flex flex-1 flex-col gap-2 rounded-lg border-4 border-green-500"
          >
            <span className="absolute left-3 top-0 -translate-y-full rounded-b-none rounded-t-lg border-4 border-b-0 border-green-500 bg-background px-4 py-1.5">
              <span>{title}</span>
            </span>

            <div className="h-full rounded-md bg-background p-4">
              {data?.map(({ name, percent }) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="w-28">{name}</span>
                  <Progress
                    value={percent}
                    className="flex-1 bg-neutral-200 dark:bg-secondary"
                    indicatorClassName="bg-gradient-to-r from-amber-400 to-rose-600"
                  />
                  <div className="col-span-2 w-16 text-right text-neutral-600 dark:text-neutral-100">
                    {percent.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
