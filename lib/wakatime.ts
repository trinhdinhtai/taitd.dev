import { CodingTimeResponse } from "@/types/wakatime"

const WAKATIME_API_ENDPOINT = "https://wakatime.com/api/v1/users/current"

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
    const response = await fetch(
      `${WAKATIME_API_ENDPOINT}/all_time_since_today`,
      options
    )
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

export async function getWeeklyCodingHours(): Promise<CodingTimeResponse> {
  try {
    const response = await fetch(
      `${WAKATIME_API_ENDPOINT}/stats/last_7_days`,
      options
    )
    const responseJson = await response.json()

    const status = response.status
    if (status >= 400) return { status, data: undefined }

    const data = responseJson?.data

    const dailyAverage = (
      (data?.daily_average_including_other_language as number) / 3600
    ).toFixed(2)
    const total = (
      (data?.total_seconds_including_other_language as number) / 3600
    ).toFixed(2)

    const bestDay = {
      date: data?.best_day?.date,
      total: ((data?.best_day?.total_seconds as number) / 3600).toFixed(2),
    }
    const languages = data?.languages
    const operatingSystems = data?.operating_systems

    return {
      status,
      data: {
        dailyAverage,
        total,
        bestDay,
        languages,
        operatingSystems,
      },
    }
  } catch (error) {
    console.error(error)
    return { status: 500, data: undefined }
  }
}
