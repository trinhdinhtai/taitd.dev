import { Variants } from "framer-motion"

export const popUp: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
    },
  },
}

export const fadeContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.1 },
  },
}
