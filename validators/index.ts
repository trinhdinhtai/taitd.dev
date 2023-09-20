import * as z from "zod"

export const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(2).max(1000),
})
