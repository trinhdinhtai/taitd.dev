import { ComponentPropsWithoutRef, useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

type CounterProps = {
  value: string | number
  digits?: number
  direction?: "up" | "down"
  delay?: number
} & ComponentPropsWithoutRef<"span">

export default function Counter({
  value,
  className,
  digits = 0,
  direction = "up",
  delay = 0,
  ...props
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  const motionValue = useMotionValue(direction === "down" ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })

  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value)
      }, delay * 1000)
  }, [motionValue, isInView, delay, value, direction])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            notation: "compact",
          }).format(latest.toFixed(digits))
        }
      }),
    [springValue, digits]
  )

  return (
    <span ref={ref} {...props}>
      {value}
    </span>
  )
}
