// https://env.t3.gg/docs/nextjs
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().min(1),
    DIRECT_URL: z.string().url().min(1),
    NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN: z.string().min(1),
    GITHUB_ACCESS_TOKEN: z.string().min(1),
    NEXT_PUBLIC_WAKATIME_ACCESS_TOKEN: z.string().min(1),
    UMAMI_API_KEY: z.string().min(1),
    UMAMI_API_CLIENT_ENDPOINT: z.string().url().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    NEXT_PUBLIC_WAKATIME_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_WAKATIME_ACCESS_TOKEN,
    UMAMI_API_KEY: process.env.UMAMI_API_KEY,
    UMAMI_API_CLIENT_ENDPOINT: process.env.UMAMI_API_CLIENT_ENDPOINT,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
})
