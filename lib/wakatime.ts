const WAKATIME_API_URL =
  "https://wakatime.com/api/v1/users/current/all_time_since_today"

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(
      process.env.NEXT_PUBLIC_WAKATIME_ACCESS_TOKEN as string
    ).toString("base64")}`,
  },
  next: { revalidate: 0 },
}

export async function getCodingHours(): Promise<string | null> {
  try {
    const response = await fetch(WAKATIME_API_URL, options)
    const wakatime = await response.json()

    const codingHours = (
      (wakatime.data.total_seconds as number) / 3600
    ).toFixed(2)
    return codingHours
  } catch (error) {
    console.error(error)
    return null
  }
}
