"use client"

import { useQuery } from "@tanstack/react-query"

import StartCard from "@/components/stat-card"

export default function Stats() {
  const { data: githubData } = useQuery({
    queryKey: ["githubData"],
    queryFn: () => fetch("/api/stats/github").then((res) => res.json()),
  })

  const { data: wakatimeData } = useQuery({
    queryKey: ["wakatimeData"],
    queryFn: () => fetch("/api/stats/wakatime").then((res) => res.json()),
  })

  const { data: umamiData } = useQuery({
    queryKey: ["umamiData"],
    queryFn: () => fetch("/api/stats/views").then((res) => res.json()),
  })

  const statCards = [
    {
      title: "Github Repositories",
      value: githubData?.repos,
      description: "Public repositories",
      link: `${githubData?.user?.html_url}?tab=repositories`,
    },
    {
      title: "Github Stars",
      value: githubData?.starsCount,
      description: "Total stars received",
      link: githubData?.user?.html_url,
    },
    {
      title: "Github Followers",
      value: githubData?.user?.followers,
      description: "People following me",
      link: githubData?.user?.html_url,
    },
    {
      title: "Coding Hours",
      value: wakatimeData?.codingHours,
      description: "Total hours spent coding",
      link: "https://wakatime.com/",
    },
    {
      title: "Blog Views",
      value: umamiData?.data.pageviews.value,
      description: "Total blog views",
      link: "https://us.umami.is/share/1hfu7snOAr7VkPJj/taitd.io.vn",
    },
  ]
  console.log("Stats ~ umamiData:", umamiData)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {statCards.map((card) => (
        <StartCard key={card.title} card={card} />
      ))}
    </div>
  )
}
