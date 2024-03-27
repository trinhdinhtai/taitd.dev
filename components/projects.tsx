"use client"

import { useQuery } from "@tanstack/react-query"

export default function Projects() {
  const { data: projects } = useQuery({
    queryKey: ["projectsData"],
    queryFn: () => fetch("/api/projects").then((res) => res.json()),
  })

  console.log(projects)

  return <div>Projects</div>
}
