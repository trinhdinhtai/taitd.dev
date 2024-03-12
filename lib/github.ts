import { GitHubUser } from "@/types"
import { addDays, formatISO, subDays } from "date-fns"

import { ContributionsCollection, ContributionsDay } from "@/types/github"

const GITHUB_API_URL = "https://api.github.com/users/trinhdinhtai"

async function getGithubStats() {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(GITHUB_API_URL),
      fetch("https://api.github.com/users/trinhdinhtai/repos?per_page=100"),
    ])

    const user = (await userResponse.json()) as GitHubUser
    const myRepos = await reposResponse.json()
    const filteredRepos = myRepos.filter((repo: any) => !repo.fork)
    const starsCount = filteredRepos.reduce(
      (acc: any, curr: any) => acc + curr.stargazers_count,
      0
    )

    return { user, repos: filteredRepos.length, starsCount }
  } catch (error) {
    console.error(error)
    return null
  }
}

const headers = new Headers({
  Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
})

export type Contributions = {
  contributionsByLast30Days: ContributionsDay[]
}

async function getGithubActivities() {
  const contributions: Contributions = {
    contributionsByLast30Days: [],
  }

  const now = new Date()
  const from = formatISO(subDays(now, 30))
  const to = formatISO(now)
  const q = {
    query: `
    query userInfo($LOGIN: String!, $FROM: DateTime!, $TO: DateTime!) {
              user(login: $LOGIN) {
                name
                contributionsCollection(from: $FROM, to: $TO) {
                  contributionCalendar {
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                      }
                    }
                  }
                }
              }
            }
          `,
    variables: {
      LOGIN: "trinhdinhtai",
      FROM: from,
      TO: to,
    },
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(q),
    headers,
  })
  const apiResponse = await response.json()
  const contributionsCollection: ContributionsCollection =
    apiResponse.data.user.contributionsCollection

  const contributionWeeks = contributionsCollection.contributionCalendar.weeks

  contributionWeeks.forEach((week) => {
    week.contributionDays.forEach(({ date, contributionCount }) => {
      contributions.contributionsByLast30Days.push({
        date,
        contributionCount,
      })
    })
  })

  return contributions
}

export { getGithubStats, getGithubActivities }
