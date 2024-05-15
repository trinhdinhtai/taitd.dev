import { getCurrentUser } from "@/lib/auth"
import { getMessages } from "@/lib/db/queries/guestbook"
import SignInButton from "@/components/auth/sign-in-button"
import MessageForm from "@/components/guestbook/message-form"
import Messages from "@/components/guestbook/messages"
import PageHeading from "@/components/page-heading"

export default async function GuestbookPage() {
  const [user, messages] = await Promise.all([getCurrentUser(), getMessages()])

  return (
    <>
      <PageHeading
        title="Guestbook"
        description="A place for you to leave your comments and feedback."
      />

      {user ? <MessageForm user={user} /> : <SignInButton />}
      <Messages user={user} messages={messages} />
    </>
  )
}
