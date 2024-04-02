"use client"

import { experiencesData } from "@/constants/experiences-data"

import SectionHeading from "@/components/ui/section-heading"
import ExperienceItem from "@/components/experience-item"

const ExperienceSection = () => {
  return (
    <div>
      <SectionHeading>Work experience</SectionHeading>

      <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
        {experiencesData.map((experience, i) => (
          <ExperienceItem key={i} experience={experience} />
        ))}
      </div>
    </div>
  )
}

export default ExperienceSection
