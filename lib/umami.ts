import { getClient } from "@umami/api-client"

const client = getClient()

const WEBSITE_ID = "918e78b6-7a58-445d-9c09-1c0e53d6fe18"

export default async function getAnalytics() {
  // @ts-ignore
  const { data } = await client.getWebsiteStats(WEBSITE_ID, {
    startAt: 0,
    endAt: Date.now(),
  })

  return data
}
