"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm transition-colors hover:bg-accent"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm transition-all hover:bg-accent hover:border-primary/30 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      whileTap={{ scale: 0.9 }}
    >
      {/* Sun Icon */}
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-amber-500" />
      </motion.div>

      {/* Moon Icon */}
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-indigo-400" />
      </motion.div>

      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark
            ? "0 0 15px rgba(129, 140, 248, 0.3)"
            : "0 0 15px rgba(251, 191, 36, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
