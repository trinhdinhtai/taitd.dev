import { PropsWithChildren } from "react"

import SignInModal from "@/components/auth/sign-in-modal"

export default async function GuestbookLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <SignInModal />
    </>
  )
}
