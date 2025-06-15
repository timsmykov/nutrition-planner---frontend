"use client"

import { useState, useEffect } from "react"
import { Home, MessageCircle, UtensilsCrossed, BarChart3, User } from "lucide-react"
import DashboardScreen from "@/components/screens/dashboard-screen"
import ChatScreen from "@/components/screens/chat-screen"
import RecipesScreen from "@/components/screens/recipes-screen"
import StatsScreen from "@/components/screens/stats-screen"
import ProfileScreen from "@/components/screens/profile-screen"

type TabType = "dashboard" | "chat" | "recipes" | "stats" | "profile"

const tabs = [
  { id: "dashboard" as TabType, label: "Dashboard", icon: Home },
  { id: "chat" as TabType, label: "Chat", icon: MessageCircle },
  { id: "recipes" as TabType, label: "Recipes", icon: UtensilsCrossed },
  { id: "stats" as TabType, label: "Stats", icon: BarChart3 },
  { id: "profile" as TabType, label: "Profile", icon: User },
]

export default function TelegramNutritionApp() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId)
  }

  const renderScreen = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardScreen />
      case "chat":
        return <ChatScreen />
      case "recipes":
        return <RecipesScreen />
      case "stats":
        return <StatsScreen />
      case "profile":
        return <ProfileScreen />
      default:
        return <DashboardScreen />
    }
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface transition-colors duration-300">
      {/* Main Content */}
      <main
        className={`pb-20 min-h-screen transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {renderScreen()}
      </main>

      {/* Bottom Navigation - Fitness Theme */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface-container/95 backdrop-blur-md border-t border-outline-variant z-50 shadow-lg">
        <div className="flex items-center justify-around py-3 px-4 safe-area-inset-bottom relative">
          {/* Active Tab Indicator - Fitness Gradient */}
          <div
            className="absolute top-0 h-1 bg-gradient-fitness-primary rounded-full transition-all duration-300 ease-out shadow-md"
            style={{
              width: "20%",
              left: `${tabs.findIndex((tab) => tab.id === activeTab) * 20}%`,
            }}
          />

          {tabs.map((tab, index) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 ${
                  isActive
                    ? "text-primary bg-primary-container shadow-lg animate-pulse-glow"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary-container/30"
                }`}
                aria-label={tab.label}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Icon className={`w-6 h-6 mb-1 transition-all duration-200 ${isActive ? "scale-110" : ""}`} />
                <span className={`text-xs font-medium transition-all duration-200 ${isActive ? "font-bold" : ""}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
