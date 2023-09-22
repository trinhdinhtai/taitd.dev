"use client"

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"

import SectionHeading from "@/components/ui/section-heading"

import "react-vertical-timeline-component/style.min.css"

import { Fragment } from "react"
import { experiencesData } from "@/constants/experiences-data"
import { useTheme } from "next-themes"

const ExperienceSection = () => {
  const { theme } = useTheme()

  return (
    <div>
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light" ? "white" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid rgba(0, 0, 0, 0.05)"
                    : "0.4rem solid rgba(255, 255, 255, 0.15)",
              }}
              date={item.date}
              icon={<item.icon />}
              iconStyle={{
                background: theme === "light" ? "white" : "black",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <p className="!mt-0 font-normal">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </Fragment>
        ))}
      </VerticalTimeline>
    </div>
  )
}

export default ExperienceSection
