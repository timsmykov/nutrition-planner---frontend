"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Award, Target, Calendar, Trophy, Flame, Zap, Activity } from "lucide-react"

type StatsTab = "overview" | "nutrition" | "awards"

const statsData = {
  overview: {
    metrics: [
      {
        label: "Avg Daily Calories",
        value: "1,850",
        change: "+5%",
        trend: "up",
        icon: Flame,
        color: "text-tertiary",
        bgColor: "bg-tertiary-container",
      },
      {
        label: "Days Tracked",
        value: "28",
        change: "+12",
        trend: "up",
        icon: Calendar,
        color: "text-primary",
        bgColor: "bg-primary-container",
      },
      {
        label: "Goal Achievement",
        value: "85%",
        change: "+8%",
        trend: "up",
        icon: Target,
        color: "text-success",
        bgColor: "bg-success-container",
      },
      {
        label: "Water Intake",
        value: "7.2L",
        change: "+0.5L",
        trend: "up",
        icon: Zap,
        color: "text-secondary",
        bgColor: "bg-secondary-container",
      },
    ],
  },
  nutrition: {
    macros: [
      {
        name: "Protein",
        current: 85,
        target: 120,
        unit: "g",
        color: "from-protein to-error",
        bgColor: "bg-protein-container",
        textColor: "text-protein",
      },
      {
        name: "Carbs",
        current: 180,
        target: 250,
        unit: "g",
        color: "from-carbs to-primary",
        bgColor: "bg-carbs-container",
        textColor: "text-carbs",
      },
      {
        name: "Fat",
        current: 65,
        target: 80,
        unit: "g",
        color: "from-fat to-warning",
        bgColor: "bg-fat-container",
        textColor: "text-fat",
      },
      {
        name: "Fiber",
        current: 25,
        target: 35,
        unit: "g",
        color: "from-fiber to-success",
        bgColor: "bg-fiber-container",
        textColor: "text-fiber",
      },
    ],
  },
  awards: [
    {
      id: 1,
      title: "Week Warrior 💪",
      description: "Tracked meals for 7 days straight",
      earned: true,
      date: "2024-01-15",
      icon: Trophy,
      color: "text-success",
      bgColor: "bg-success-container",
    },
    {
      id: 2,
      title: "Hydration Hero 💧",
      description: "Drank 8 glasses of water daily for 5 days",
      earned: true,
      date: "2024-01-12",
      icon: Zap,
      color: "text-primary",
      bgColor: "bg-primary-container",
    },
    {
      id: 3,
      title: "Protein Power 🥩",
      description: "Met protein goals for 10 days",
      earned: false,
      progress: 7,
      icon: Flame,
      color: "text-tertiary",
      bgColor: "bg-tertiary-container",
    },
    {
      id: 4,
      title: "Balanced Eater 🥗",
      description: "Maintained balanced macros for 14 days",
      earned: false,
      progress: 9,
      icon: Target,
      color: "text-secondary",
      bgColor: "bg-secondary-container",
    },
  ],
}

export default function StatsScreen() {
  const [activeTab, setActiveTab] = useState<StatsTab>("overview")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const tabs = [
    {
      id: "overview" as StatsTab,
      label: "Overview",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary-container",
    },
    {
      id: "nutrition" as StatsTab,
      label: "Nutrition",
      icon: Target,
      color: "text-secondary",
      bgColor: "bg-secondary-container",
    },
    {
      id: "awards" as StatsTab,
      label: "Awards",
      icon: Award,
      color: "text-tertiary",
      bgColor: "bg-tertiary-container",
    },
  ]

  return (
    <div className="p-6 bg-gradient-to-br from-surface via-surface to-primary-container/5 min-h-screen">
      {/* Header */}
      <div
        className={`text-center mb-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <h1 className="text-4xl font-bold text-on-surface mb-3 tracking-tight bg-gradient-fitness-primary bg-clip-text text-transparent">
          Your Fitness Progress 📊
        </h1>
        <p className="text-on-surface-variant text-lg font-medium">Track your nutrition journey to success!</p>
      </div>

      {/* Tab Navigation - Mobile Optimized */}
      <div
        className={`bg-surface-container rounded-3xl p-2 mb-8 shadow-xl border border-outline-variant transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="grid grid-cols-3 gap-1 sm:flex sm:gap-0">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 py-3 px-2 sm:px-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 font-bold text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? "bg-gradient-fitness-primary text-on-primary shadow-lg animate-pulse-glow"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span className="truncate text-center leading-tight">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-6">
            {statsData.overview.metrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <div
                  key={index}
                  className={`bg-surface-container rounded-3xl p-6 shadow-xl border border-outline-variant hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ animationDelay: `${(index + 2) * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${metric.bgColor} rounded-2xl shadow-lg`}>
                      <Icon className={`w-7 h-7 ${metric.color}`} />
                    </div>
                    <Activity
                      className={`w-5 h-5 ${metric.trend === "up" ? "text-success" : "text-error"} animate-pulse`}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-on-surface-variant mb-2">{metric.label}</h3>
                  <p className="text-3xl font-bold text-on-surface mb-2">{metric.value}</p>
                  <p className={`text-sm font-bold ${metric.trend === "up" ? "text-success" : "text-error"}`}>
                    {metric.change} this week 🚀
                  </p>
                </div>
              )
            })}
          </div>

          {/* Weekly Chart Placeholder */}
          <div
            className={`bg-surface-container rounded-3xl p-8 shadow-xl border border-outline-variant transition-all duration-700 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h3 className="text-xl font-bold text-on-surface mb-6">Weekly Overview 📈</h3>
            <div className="h-48 bg-gradient-to-br from-surface-variant to-primary-container/20 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
              <p className="text-on-surface-variant font-bold text-lg">Interactive charts coming soon! 📊</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-on-surface mb-6 bg-gradient-fitness-health bg-clip-text text-transparent">
            Macro Nutrients Summary 🥗
          </h2>
          {statsData.nutrition.macros.map((macro, index) => (
            <div
              key={index}
              className={`bg-surface-container rounded-3xl p-6 shadow-xl border border-outline-variant hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${macro.bgColor} rounded-xl`}>
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${macro.color}`} />
                  </div>
                  <h3 className="font-bold text-on-surface text-xl">{macro.name}</h3>
                </div>
                <span className="text-sm text-on-surface-variant font-bold bg-surface-variant px-4 py-2 rounded-full">
                  {macro.current}/{macro.target} {macro.unit}
                </span>
              </div>
              <div className="relative mb-4">
                <div className="w-full bg-surface-variant rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`bg-gradient-to-r ${macro.color} h-4 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
                    style={{
                      width: `${Math.min((macro.current / macro.target) * 100, 100)}%`,
                      animationDelay: `${index * 200}ms`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-on-surface-variant font-medium">
                  {Math.round((macro.current / macro.target) * 100)}% of daily goal
                </p>
                <span
                  className={`text-sm font-bold ${(macro.current / macro.target) >= 1 ? "text-success" : macro.textColor}`}
                >
                  {macro.current / macro.target >= 1 ? "✅ Goal Achieved!" : "💪 Keep Going!"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "awards" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-on-surface mb-6 bg-gradient-fitness-energy bg-clip-text text-transparent">
            Achievements & Badges 🏆
          </h2>
          {statsData.awards.map((award, index) => {
            const Icon = award.icon
            return (
              <div
                key={award.id}
                className={`bg-surface-container rounded-3xl p-6 shadow-xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  award.earned
                    ? "border-success/30 bg-gradient-to-br from-surface-container to-success-container/20"
                    : "border-outline-variant"
                } ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-18 h-18 rounded-3xl flex items-center justify-center shadow-xl ${
                      award.earned ? "bg-gradient-fitness-primary animate-pulse-glow" : "bg-surface-variant"
                    }`}
                  >
                    <Icon className={`w-10 h-10 ${award.earned ? "text-on-primary" : "text-on-surface-variant"}`} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-bold text-xl mb-2 ${award.earned ? "text-on-surface" : "text-on-surface-variant"}`}
                    >
                      {award.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant mb-4 leading-relaxed font-medium">
                      {award.description}
                    </p>
                    {award.earned ? (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-success" />
                        <span className="text-sm text-success font-bold">
                          Earned on {new Date(award.date!).toLocaleDateString()} 🎉
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-on-surface-variant font-bold">
                          Progress: {award.progress}/10 days 💪
                        </p>
                        <div className="relative">
                          <div className="w-full bg-surface-variant rounded-full h-4 overflow-hidden shadow-inner">
                            <div
                              className="bg-gradient-fitness-primary h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                              style={{ width: `${(award.progress! / 10) * 100}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
