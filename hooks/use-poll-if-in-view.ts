import { useEffect, useRef, useState } from "react"
import { useIntersection, useInterval } from "react-use"

// 1. only poll when intersecting (in view)
// 2. stop polling after `max` polls (before novelty has wears off and it
//    becomes distracting)
// todo: move to useReducer
export const usePollIfInView = (interval: number = 1000, max: number = 3) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {})

  const [shouldPoll, setShouldPoll] = useState(false)
  const [polledCount, setPolledCount] = useState(0)

  useInterval(
    () => {
      if (polledCount >= max) {
        // stop polling after max is reached
        setShouldPoll(false)
      } else {
        // increment poll count
        setPolledCount(polledCount + 1)
      }
    },
    shouldPoll ? interval : null
  )

  useEffect(() => {
    if (intersection?.isIntersecting) {
      // reset state when in view
      setShouldPoll(true)
      setPolledCount(0)
    } else {
      // stop polling when not in view
      setShouldPoll(false)
    }
  }, [intersection?.isIntersecting])

  return {
    intersectionRef,
    shouldPoll,
  }
}
