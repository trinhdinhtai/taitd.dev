import SignInButton from "@/components/auth/sign-in-button"
import PageHeading from "@/components/page-heading"

export default function GuestbookPage() {
  return (
    <>
      <PageHeading
        title="Guestbook"
        description="A place for you to leave your comments and feedback."
      />

      <SignInButton />
    </>
  )
}
