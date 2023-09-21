import * as z from "zod"

export const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(2).max(1000),
})

export const ogImageSchema = z.object({
  heading: z.string(),
  type: z.string(),
  mode: z.enum(["light", "dark"]).default("dark"),
})
