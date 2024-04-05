import PageHeading from "@/components/page-heading"
import SignInButton from "@/components/sign-in-button"

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
