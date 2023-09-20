import Contact from "@/components/contact"
import Intro from "@/components/intro"

export default function Home() {
  return (
    <>
      <section className="container max-w-4xl py-6 lg:py-10">
        <div className="flex flex-col items-center space-y-16">
          <Intro />
          <Contact />
        </div>
      </section>
    </>
  )
}
