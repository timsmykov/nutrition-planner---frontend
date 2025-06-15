"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Loader2 } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-surface-variant animate-pulse">
        <Loader2 className="w-6 h-6 text-on-surface-variant animate-spin" />
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setIsAnimating(true)
    const newTheme = isDark ? "light" : "dark"

    // Force immediate DOM update
    document.documentElement.classList.toggle("dark", newTheme === "dark")

    // Update theme state
    setTheme(newTheme)

    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface ${
        isDark
          ? "bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25 dark:shadow-purple-400/30"
          : "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/25"
      } ${isAnimating ? "animate-theme-switch" : ""}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative">
        {isDark ? (
          <Moon className="w-6 h-6 text-white transition-all duration-300" />
        ) : (
          <Sun className="w-6 h-6 text-white transition-all duration-300" />
        )}

        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isDark ? "bg-purple-400 opacity-20 blur-md" : "bg-yellow-400 opacity-30 blur-md"
          }`}
        />
      </div>

      {/* Ripple effect on click */}
      {isAnimating && <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />}
    </button>
  )
}
