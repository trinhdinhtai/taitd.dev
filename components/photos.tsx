"use client"

import Image from "next/image"
import { slideInWithFadeOut } from "@/constants/framer-motion-variants"
import { motion } from "framer-motion"

const images = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1585618256754-241cfe4e8113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=100",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1585619203238-70e7631cc672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1585619443911-c2bb23fb2a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
]

export default function Photos() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={slideInWithFadeOut}
      className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
    >
      {images.map((image) => (
        <div className="relative aspect-[2/3]" key={image.id}>
          <Image
            src={image.src}
            alt="playing guitar"
            fill
            className="dark:bg-primary-bg bg-secondary-bg object-cover"
          />
        </div>
      ))}
    </motion.div>
  )
}
