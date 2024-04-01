"use client"

import { experiencesData } from "@/constants/experiences-data"

import SectionHeading from "@/components/ui/section-heading"
import ExperienceItem from "@/components/experience-item"

const ExperienceSection = () => {
  return (
    <div>
      <SectionHeading>My experience</SectionHeading>

      <ol className="relative mt-16">
        {experiencesData.map((experience, i) => (
          <ExperienceItem key={i} experience={experience} />
        ))}
      </ol>
    </div>
  )
}

export default ExperienceSection
