import BlogSection from "@/components/blog-section"
import Contact from "@/components/contact"
import Intro from "@/components/intro"
import SkillSection from "@/components/skill-section"

export default function Home() {
  return (
    <>
      <section className="container max-w-4xl">
        <Intro />
        <div className="mb-20 flex flex-col items-center space-y-40">
          <BlogSection />
          <SkillSection />
          <Contact />
        </div>
      </section>
    </>
  )
}
