import { type User } from "next-auth"

import { getCurrentUser } from "@/lib/auth"

export const privateAction = async (
  callback: (user: User) => Promise<{ message: string; error?: boolean }>
): Promise<{ message: string; error?: boolean }> => {
  const user = await getCurrentUser()

  if (!user) {
    return {
      message: "Unauthorized",
      error: true,
    }
  }

  return callback(user)
}
