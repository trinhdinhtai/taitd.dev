import { GitHubUser } from "@/types"

const GITHUB_API_URL = "https://api.github.com/users/trinhdinhtai"

const options: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer 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`,
  },
  next: { revalidate: 0 },
}

async function getGithubStats() {
  try {
    const [userResponse, myReposResponse] = await Promise.all([
      fetch(GITHUB_API_URL, options),
      fetch(`${GITHUB_API_URL}/repos?per_page=100`, options),
    ])

    const user = (await userResponse.json()) as GitHubUser
    const myRepos = await myReposResponse.json()
    const filteredRepos = myRepos.filter((repo: any) => !repo.fork)
    const starsCount = filteredRepos.reduce(
      (acc: any, curr: any) => acc + curr.stargazers_count,
      0
    )

    return { user, repos: myRepos.public_repos, starsCount }
  } catch (error) {
    console.error(error)
    return null
  }
}

export { getGithubStats }
