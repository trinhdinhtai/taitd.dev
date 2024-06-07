import { PropsWithChildren } from "react"

import SignInModal from "@/components/auth/sign-in-modal"

export default async function PostLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <SignInModal />
    </>
  )
}
