"use client"

import { useQuery } from "@tanstack/react-query"

export default function Stats() {
  const { isPending, error, data } = useQuery({
    queryKey: ["githubData"],
    queryFn: () => fetch("/api/stats/github").then((res) => res.json()),
  })

  console.log(data)

  return <div>Stats</div>
}
