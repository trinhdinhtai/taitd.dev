"use client"

import Link from "next/link"
import { fadeContainer, popUp } from "@/constants/framer-motion-variants"
import { software } from "@/constants/uses-data"
import { motion } from "framer-motion"

import AnimatedDiv from "@/components/framer-motion/animated-div"

export default function Uses() {
  return (
    <div className="mt-10">
      <motion.h2 className="font-heading text-lg font-bold sm:text-2xl">
        Software and Applications
      </motion.h2>

      <AnimatedDiv
        variants={fadeContainer}
        className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7"
      >
        {software.map((item) => {
          const Icon = item.Icon

          return (
            <motion.div key={item.name} variants={popUp}>
              <Link
                title={item.name + " - " + item.description}
                rel="noopener noreferrer"
                target="_blank"
                href={item.link}
                className="relative flex flex-col items-center justify-center gap-2 rounded-md border border-transparent bg-background p-6 text-gray-700 shadow transition-all hover:z-10 hover:origin-center hover:border-gray-400 hover:text-black hover:shadow-lg active:!scale-90 dark:bg-secondary dark:text-gray-300/80 dark:shadow-md dark:hover:border-neutral-600 dark:hover:text-white lg:hover:!scale-125"
              >
                <Icon className="!pointer-events-none mb-4 h-8 w-8" />
                <p className="line-clamp-1 select-none text-xs">{item.name}</p>
              </Link>
            </motion.div>
          )
        })}
      </AnimatedDiv>
    </div>
  )
}
