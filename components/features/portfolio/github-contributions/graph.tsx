"use client"

import { use } from "react"
import { format, parseISO } from "date-fns"
import { LoaderIcon } from "lucide-react"

import { SOCIAL } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from "@/components/ui/contribution-graph"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"

export function GitHubContributionGraph({
  contributions,
  className,
}: {
  contributions: Promise<Activity[]>
  className?: string
}) {
  const data = use(contributions)

  if (data.length === 0) {
    return null
  }

  return (
    <figure>
      <ContributionGraph
        className={cn("w-full gap-4 py-4", className)}
        data={data}
        blockSize={12}
        blockMargin={2}
        blockRadius={0}
        aria-label="GitHub Contributions Graph"
      >
        <ContributionGraphCalendar
          className="w-full px-4 **:data-[slot=month-labels]:text-muted-foreground [&_svg]:h-auto [&_svg]:w-full"
          title="GitHub Contributions"
          aria-hidden
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger
                render={
                  <g>
                    <ContributionGraphBlock
                      activity={activity}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                    />
                  </g>
                }
              />
              <TooltipContent className="font-sans">
                <p>
                  {activity.count} contribution{activity.count > 1 ? "s" : null}{" "}
                  on {format(parseISO(activity.date), "d MMM yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-4 text-sm">
          <ContributionGraphTotalCount>
            {({ totalCount }) => (
              <figcaption className="text-pretty tabular-nums">
                {totalCount.toLocaleString("en")} contributions,{" "}
                {format(parseISO(data[0].date), "dd.MM.yyyy")} –{" "}
                {format(parseISO(data[data.length - 1].date), "dd.MM.yyyy")}.
                Source:{" "}
                <a
                  href={SOCIAL.github.href}
                  className="link-underline"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub
                </a>
                .
              </figcaption>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend aria-hidden />
        </ContributionGraphFooter>
      </ContributionGraph>
    </figure>
  )
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-45 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  )
}
