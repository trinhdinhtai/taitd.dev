import { GitHubUser } from "@/types"

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

export { getGithubStats }
