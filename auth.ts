import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"

import { env } from "@/env.mjs"
import { prisma } from "@/lib/prisma"

export const config = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  basePath: "/api/auth",
  secret: env.AUTH_SECRET,
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
  ...authConfig,
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)
