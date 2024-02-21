import { GitHubUser } from "@/types"

const GITHUB_API_URL = "https://api.github.com/users/trinhdinhtai"

async function getGithubStats() {
  try {
    const [userResponse, myReposResponse] = await Promise.all([
      fetch(GITHUB_API_URL),
      fetch(`${GITHUB_API_URL}/repos?per_page=100`),
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
