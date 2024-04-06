import { User } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  id: User["id"]
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
