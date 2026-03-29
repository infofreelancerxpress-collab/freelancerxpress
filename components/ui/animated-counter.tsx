"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring, useMotionValue, useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export function AnimatedCounter({
  value,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      motionValue.set(value)
    }
  }, [isInView, value, hasAnimated, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      const formatted = latest.toFixed(decimals)
      setDisplayValue(formatted)
    })

    return () => unsubscribe()
  }, [springValue, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CountUp({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (end - startValue) + startValue)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isInView])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
