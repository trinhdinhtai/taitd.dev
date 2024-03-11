"use client"

import { useQuery } from "@tanstack/react-query"

import StartCard from "@/components/stat-card"

export default function Stats() {
  const { data: githubData } = useQuery({
    queryKey: ["githubData"],
    queryFn: () => fetch("/api/stats/github").then((res) => res.json()),
  })

  const statCards = [
    {
      title: "Github Repositories",
      value: githubData?.repos,
      description: "Public repositories",
      link: `${githubData?.user?.html_url}?tab=repositories`,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {statCards.map((card) => (
        <StartCard key={card.title} card={card} />
      ))}
    </div>
  )
}
