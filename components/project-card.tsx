"use client"

import Image from "next/image"
import { Project } from "@/types"
import { motion } from "framer-motion"

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, tags, imageUrl } = project
  return (
    <motion.div className="group mb-3 last:mb-0 sm:mb-8">
      <section className="relative overflow-hidden rounded-lg border border-black/5 bg-gray-100 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:h-[20rem] sm:pr-8 sm:group-even:pl-8">
        <div className="flex h-full flex-col px-5 pb-7 pt-4 sm:max-w-[50%] sm:pl-10 sm:pr-2 sm:pt-10 sm:group-even:ml-[18rem]">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="rounded-full bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={imageUrl}
          alt="Project I worked on"
          width={1130}
          height={600}
          quality={95}
          className="absolute -right-40 top-8 hidden w-[28.25rem] rounded-t-lg shadow-2xl transition
        group-even:-left-40 
        group-even:right-[initial]
        group-hover:-translate-x-3
        group-hover:translate-y-3
        group-hover:-rotate-2

        group-hover:scale-[1.04]
        group-even:group-hover:translate-x-3
        group-even:group-hover:translate-y-3

        group-even:group-hover:rotate-2 sm:block"
        />
      </section>
    </motion.div>
  )
}

export default ProjectCard
