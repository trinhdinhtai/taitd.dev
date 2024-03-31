import { HTMLAttributes, ReactNode } from "react"
import { motion, Variants } from "framer-motion"

interface AnimatedDivProps extends HTMLAttributes<HTMLDivElement> {
  variants: Variants
  children: ReactNode
  infinity?: boolean
}

export default function AnimatedDiv({
  variants,
  className,
  children,
  infinity,
}: AnimatedDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !infinity }}
      variants={variants}
      className={className}
      transition={{ staggerChildren: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
