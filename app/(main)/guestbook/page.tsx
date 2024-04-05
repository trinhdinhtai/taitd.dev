import { getCurrentUser } from "@/lib/auth"
import SignInButton from "@/components/auth/sign-in-button"
import MessageForm from "@/components/message-form"
import PageHeading from "@/components/page-heading"

export default async function GuestbookPage() {
  const user = await getCurrentUser()

  return (
    <>
      <PageHeading
        title="Guestbook"
        description="A place for you to leave your comments and feedback."
      />

      {user ? <MessageForm user={user} /> : <SignInButton />}
    </>
  )
}
