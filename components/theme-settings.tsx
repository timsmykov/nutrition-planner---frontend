"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor, Palette, Loader2, Check } from "lucide-react"

export function ThemeSettings() {
  const [mounted, setMounted] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-surface-container rounded-3xl p-8 shadow-xl border border-outline-variant animate-pulse">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-surface-variant rounded-2xl flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-on-surface-variant animate-spin" />
          </div>
          <div>
            <div className="h-6 bg-surface-variant rounded w-32 mb-2"></div>
            <div className="h-4 bg-surface-variant rounded w-48"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-surface-variant rounded-2xl"></div>
          ))}
        </div>
      </div>
    )
  }

  const handleThemeChange = (newTheme: string) => {
    setIsChanging(true)
    setTheme(newTheme)

    // Reset changing state after animation
    setTimeout(() => setIsChanging(false), 300)
  }

  const themeOptions = [
    {
      id: "light",
      name: "Light Mode",
      description: "Clean and bright interface for daytime use",
      icon: Sun,
      gradient: "from-yellow-400 to-orange-500",
      shadowColor: "shadow-yellow-500/25",
      preview: "bg-white border-gray-200",
    },
    {
      id: "dark",
      name: "Dark Mode",
      description: "Easy on the eyes for nighttime sessions",
      icon: Moon,
      gradient: "from-purple-600 to-blue-600",
      shadowColor: "shadow-purple-500/25",
      preview: "bg-gray-900 border-gray-700",
    },
    {
      id: "system",
      name: "System Default",
      description: "Automatically match your device settings",
      icon: Monitor,
      gradient: "from-gray-500 to-gray-700",
      shadowColor: "shadow-gray-500/25",
      preview: "bg-gradient-to-r from-white to-gray-900 border-gray-400",
    },
  ]

  const currentTheme = theme || "system"
  const effectiveTheme = resolvedTheme || systemTheme || "light"

  return (
    <div className="bg-surface-container rounded-3xl p-8 shadow-xl border border-outline-variant transition-all duration-700">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-gradient-fitness-primary rounded-2xl shadow-lg">
          <Palette className="w-7 h-7 text-on-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Theme Settings 🎨</h2>
          <p className="text-on-surface-variant font-medium">Customize your app's appearance and visual experience</p>
        </div>
      </div>

      {/* Current Theme Status */}
      <div className="mb-8 p-6 bg-surface-variant rounded-2xl border border-outline-variant">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-on-surface mb-1">Current Theme</h3>
            <p className="text-sm text-on-surface-variant">
              {currentTheme === "system"
                ? `System (${effectiveTheme === "dark" ? "Dark" : "Light"})`
                : currentTheme === "dark"
                  ? "Dark Mode"
                  : "Light Mode"}
            </p>
          </div>
          <div
            className={`w-16 h-10 rounded-xl border-2 transition-all duration-300 ${
              effectiveTheme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div
              className={`w-full h-full rounded-lg transition-all duration-300 ${
                effectiveTheme === "dark"
                  ? "bg-gradient-to-br from-purple-900 to-blue-900"
                  : "bg-gradient-to-br from-yellow-100 to-orange-100"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Theme Options */}
      <div className="space-y-4">
        <h3 className="font-bold text-on-surface text-lg mb-4">Choose Your Theme</h3>
        {themeOptions.map((option, index) => {
          const Icon = option.icon
          const isSelected = currentTheme === option.id
          const isChangingThis = isChanging && isSelected

          return (
            <button
              key={option.id}
              onClick={() => handleThemeChange(option.id)}
              disabled={isChanging}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-left ${
                isSelected
                  ? "border-primary bg-primary-container shadow-lg dark:shadow-primary/30"
                  : "border-outline-variant bg-surface-variant hover:border-primary/50 hover:bg-primary-container/20"
              } ${isChanging ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                {/* Theme Icon */}
                <div
                  className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${option.gradient} ${option.shadowColor}`}
                >
                  <Icon className="w-7 h-7 text-white" />
                  {isChangingThis && <div className="absolute inset-0 rounded-2xl bg-white opacity-20 animate-ping" />}
                </div>

                {/* Theme Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-bold text-on-surface text-lg">{option.name}</h4>
                    {isSelected && (
                      <div className="p-1 bg-success rounded-full">
                        <Check className="w-4 h-4 text-on-success" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{option.description}</p>
                </div>

                {/* Theme Preview */}
                <div className={`w-12 h-8 rounded-lg border-2 transition-all duration-300 ${option.preview}`}>
                  {option.id === "system" && (
                    <div className="w-full h-full rounded-md bg-gradient-to-r from-white via-gray-300 to-gray-900" />
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Additional Theme Info */}
      <div className="mt-8 p-6 bg-gradient-to-br from-surface-container to-primary-container/20 rounded-2xl border border-outline-variant">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary-container rounded-xl">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-2">Theme Benefits 💡</h4>
            <ul className="text-sm text-on-surface-variant space-y-1 font-medium">
              <li>
                • <strong>Light Mode:</strong> Better for daytime use and reading
              </li>
              <li>
                • <strong>Dark Mode:</strong> Reduces eye strain in low light
              </li>
              <li>
                • <strong>System:</strong> Automatically adapts to your device
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
