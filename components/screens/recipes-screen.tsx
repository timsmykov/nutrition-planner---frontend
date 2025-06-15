"use client"

import { useState, useEffect } from "react"
import { UtensilsCrossed, Clock, Users, Star, Target } from "lucide-react"

export default function RecipesScreen() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const comingSoonFeatures = [
    {
      icon: UtensilsCrossed,
      title: "Personalized Recipes",
      description: "AI-powered meal suggestions based on your fitness goals",
      color: "text-primary",
      bgColor: "bg-primary-container",
    },
    {
      icon: Clock,
      title: "Quick Meals",
      description: "15-minute recipes for busy gym schedules",
      color: "text-secondary",
      bgColor: "bg-secondary-container",
    },
    {
      icon: Users,
      title: "Family Portions",
      description: "Scale recipes for your workout crew",
      color: "text-tertiary",
      bgColor: "bg-tertiary-container",
    },
    {
      icon: Star,
      title: "Favorites",
      description: "Save and organize your go-to fitness meals",
      color: "text-accent",
      bgColor: "bg-accent-container",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-surface via-surface to-primary-container/5">
      {/* Main Icon */}
      <div
        className={`relative mb-8 transition-all duration-700 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
      >
        <div className="w-28 h-28 bg-gradient-fitness-primary rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-glow">
          <UtensilsCrossed className="w-14 h-14 text-on-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-fitness-energy rounded-full flex items-center justify-center shadow-xl animate-bounce">
          <span className="text-lg font-bold text-on-tertiary">🚀</span>
        </div>
      </div>

      {/* Title */}
      <div
        className={`text-center mb-8 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <h1 className="text-4xl font-bold text-on-surface mb-4 tracking-tight bg-gradient-fitness-primary bg-clip-text text-transparent">
          Recipes Coming Soon! 🍽️
        </h1>
        <p className="text-on-surface-variant text-lg max-w-md leading-relaxed font-medium">
          We're cooking up something amazing! Recipe functionality will be available soon with personalized meal
          suggestions for your fitness journey! 💪
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full mb-8">
        {comingSoonFeatures.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className={`bg-surface-container rounded-3xl p-6 shadow-xl border border-outline-variant hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ animationDelay: `${(index + 3) * 150}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-4 ${feature.bgColor} rounded-2xl shadow-lg`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{feature.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress Indicator */}
      <div
        className={`bg-gradient-to-br from-surface-container to-success-container/20 rounded-3xl p-8 max-w-sm w-full shadow-xl border border-outline-variant transition-all duration-700 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-success rounded-full">
              <Target className="w-5 h-5 text-on-success" />
            </div>
            <h3 className="font-bold text-on-surface">Development Progress</h3>
          </div>
          <div className="w-full bg-surface-variant rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-fitness-health h-4 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
              style={{ width: "85%" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <p className="text-sm text-on-surface-variant mt-3 font-semibold">85% Complete 🎯</p>
        </div>

        <div className="space-y-4">
          {[
            { label: "Recipe Database", status: "✅ Complete", color: "text-success" },
            { label: "AI Integration", status: "✅ Complete", color: "text-success" },
            { label: "User Interface", status: "🔄 In Progress", color: "text-tertiary" },
            { label: "Testing", status: "⏳ Pending", color: "text-on-surface-variant" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-on-surface-variant font-medium">{item.label}</span>
              <span className={`font-bold ${item.color}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
