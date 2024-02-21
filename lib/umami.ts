const UMAMI_API_URL = "https://u.taitd/api/auth/login"

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer sRkr6Oz842FhCj8M6nEHxcz3IqrrEh64`,
  },
  next: { revalidate: 0 },
}

export async function getAnalytics() {
  try {
    const response = await fetch("https://api.umami.is/v1/websites", options)

    const test = await response.json()
    return test
  } catch (error) {
    console.error(error)
    return null
  }
}
