import { PropsWithChildren } from "react"
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"

import SignInModal from "@/components/auth/sign-in-modal"

export default async function PostLayout({ children }: PropsWithChildren) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      {children}
      <SignInModal />
    </SessionProvider>
  )
}
