import { PropsWithChildren } from "react"

import SignInModal from "@/components/sign-in-modal"

export default function GuestbookLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <SignInModal />
    </>
  )
}
