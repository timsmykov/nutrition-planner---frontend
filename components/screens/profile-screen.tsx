"use client"

import { useState, useEffect } from "react"
import { User, Target, Settings, HelpCircle, Edit3, Save, X, Calculator, Activity } from "lucide-react"
import { ThemeSettings } from "@/components/theme-settings"

type ProfileTab = "profile" | "goals" | "preferences" | "help"

interface UserProfile {
  name: string
  age: number
  height: number
  weight: number
  activityLevel: string
  goal: string
}

const mockProfile: UserProfile = {
  name: "Alex Johnson",
  age: 28,
  height: 175,
  weight: 70,
  activityLevel: "moderate",
  goal: "maintain",
}

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile")
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockProfile)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const tabs = [
    {
      id: "profile" as ProfileTab,
      label: "Profile",
      icon: User,
      color: "text-primary",
      bgColor: "bg-primary-container",
    },
    {
      id: "goals" as ProfileTab,
      label: "Goals",
      icon: Target,
      color: "text-secondary",
      bgColor: "bg-secondary-container",
    },
    {
      id: "preferences" as ProfileTab,
      label: "Settings",
      icon: Settings,
      color: "text-tertiary",
      bgColor: "bg-tertiary-container",
    },
    {
      id: "help" as ProfileTab,
      label: "Help",
      icon: HelpCircle,
      color: "text-accent",
      bgColor: "bg-accent-container",
    },
  ]

  const calculateBMI = (weight: number, height: number) => {
    const heightInM = height / 100
    return (weight / (heightInM * heightInM)).toFixed(1)
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-carbs", bgColor: "bg-carbs-container" }
    if (bmi < 25) return { category: "Normal", color: "text-success", bgColor: "bg-success-container" }
    if (bmi < 30) return { category: "Overweight", color: "text-warning", bgColor: "bg-warning-container" }
    return { category: "Obese", color: "text-error", bgColor: "bg-error-container" }
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const bmi = Number.parseFloat(calculateBMI(profile.weight, profile.height))
  const bmiInfo = getBMICategory(bmi)

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-surface via-surface to-primary-container/5 min-h-screen">
      {/* Header */}
      <div
        className={`text-center mb-6 sm:mb-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <div className="relative mx-auto mb-4 sm:mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-fitness-primary rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
            <User className="w-12 h-12 sm:w-14 sm:h-14 text-on-primary" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-fitness-energy rounded-full flex items-center justify-center shadow-xl">
            <span className="text-base sm:text-lg font-bold text-on-tertiary">💪</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-on-surface mb-2 tracking-tight bg-gradient-fitness-primary bg-clip-text text-transparent px-4">
          {profile.name}
        </h1>
        <p className="text-on-surface-variant text-base sm:text-lg font-medium px-4">
          Manage your fitness profile and preferences
        </p>
      </div>

      {/* Tab Navigation - Mobile Optimized */}
      <div
        className={`bg-surface-container rounded-3xl p-2 mb-8 shadow-xl border border-outline-variant transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-0">
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
                <span className="truncate max-w-full">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="space-y-8">
          {/* Profile Info */}
          <div
            className={`bg-surface-container rounded-3xl p-8 shadow-xl border border-outline-variant transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-on-surface">Personal Information 📋</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-primary hover:text-primary/80 transition-all duration-200 p-3 rounded-full hover:bg-primary-container hover:scale-110 active:scale-95 shadow-lg"
                >
                  <Edit3 className="w-6 h-6" />
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="text-success hover:text-success/80 transition-all duration-200 p-3 rounded-full hover:bg-success-container hover:scale-110 active:scale-95 shadow-lg"
                  >
                    <Save className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-error hover:text-error/80 transition-all duration-200 p-3 rounded-full hover:bg-error-container hover:scale-110 active:scale-95 shadow-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-3">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-surface-variant text-on-surface rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant transition-all duration-200 hover:bg-surface-variant/80 font-medium"
                  />
                ) : (
                  <div className="bg-surface-variant rounded-2xl px-6 py-4 border border-outline-variant">
                    <p className="text-on-surface font-semibold">{profile.name}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-3">Age</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedProfile.age}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, age: Number.parseInt(e.target.value) }))}
                      className="w-full bg-surface-variant text-on-surface rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant transition-all duration-200 hover:bg-surface-variant/80 font-medium"
                    />
                  ) : (
                    <div className="bg-surface-variant rounded-2xl px-6 py-4 border border-outline-variant">
                      <p className="text-on-surface font-semibold">{profile.age} years</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-3">Height</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedProfile.height}
                      onChange={(e) =>
                        setEditedProfile((prev) => ({ ...prev, height: Number.parseInt(e.target.value) }))
                      }
                      className="w-full bg-surface-variant text-on-surface rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant transition-all duration-200 hover:bg-surface-variant/80 font-medium"
                    />
                  ) : (
                    <div className="bg-surface-variant rounded-2xl px-6 py-4 border border-outline-variant">
                      <p className="text-on-surface font-semibold">{profile.height} cm</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-3">Weight</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.weight}
                    onChange={(e) => setEditedProfile((prev) => ({ ...prev, weight: Number.parseInt(e.target.value) }))}
                    className="w-full bg-surface-variant text-on-surface rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant transition-all duration-200 hover:bg-surface-variant/80 font-medium"
                  />
                ) : (
                  <div className="bg-surface-variant rounded-2xl px-6 py-4 border border-outline-variant">
                    <p className="text-on-surface font-semibold">{profile.weight} kg</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BMI Calculator */}
          <div
            className={`bg-gradient-to-br from-surface-container to-primary-container/20 rounded-3xl p-8 shadow-xl border border-outline-variant transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-primary rounded-2xl shadow-lg">
                <Calculator className="w-7 h-7 text-on-primary" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface">BMI Calculator 📊</h3>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-on-surface mb-4">{bmi}</div>
              <div
                className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-bold mb-6 ${bmiInfo.color} ${bmiInfo.bgColor} shadow-lg`}
              >
                <Activity className="w-4 h-4 mr-2" />
                {bmiInfo.category}
              </div>

              <div className="relative mb-6">
                <div className="w-full bg-surface-variant rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-fitness-primary h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>

              <p className="text-sm text-on-surface-variant font-semibold">Normal BMI Range: 18.5 - 24.9</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "goals" && (
        <div className="space-y-6">
          <div
            className={`bg-surface-container rounded-3xl p-8 shadow-xl border border-outline-variant transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="text-2xl font-bold text-on-surface mb-6 bg-gradient-fitness-health bg-clip-text text-transparent">
              Daily Fitness Goals 🎯
            </h2>
            <div className="space-y-6">
              {[
                {
                  label: "Calories Target",
                  value: 2000,
                  unit: "kcal",
                  color: "text-tertiary",
                  bgColor: "bg-tertiary-container",
                },
                { label: "Protein", value: 120, unit: "g", color: "text-protein", bgColor: "bg-protein-container" },
                { label: "Carbs", value: 250, unit: "g", color: "text-carbs", bgColor: "bg-carbs-container" },
                { label: "Fat", value: 80, unit: "g", color: "text-fat", bgColor: "bg-fat-container" },
                {
                  label: "Water Glasses",
                  value: 8,
                  unit: "glasses",
                  color: "text-primary",
                  bgColor: "bg-primary-container",
                },
              ].map((goal, index) => (
                <div key={goal.label} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 ${goal.bgColor} rounded-xl`}>
                      <div className={`w-4 h-4 rounded-full ${goal.color.replace("text-", "bg-")}`} />
                    </div>
                    <label className="block text-sm font-bold text-on-surface-variant">{goal.label}</label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      defaultValue={goal.value}
                      className="w-full bg-surface-variant text-on-surface rounded-2xl px-6 py-4 pr-20 focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant transition-all duration-200 hover:bg-surface-variant/80 font-semibold"
                    />
                    <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-on-surface-variant font-bold">
                      {goal.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="space-y-8">
          {/* Theme Settings - New centralized location */}
          <div
            className={`transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <ThemeSettings />
          </div>

          {/* Other App Preferences */}
          <div
            className={`bg-surface-container rounded-3xl p-8 shadow-xl border border-outline-variant transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="text-2xl font-bold text-on-surface mb-6 bg-gradient-fitness-energy bg-clip-text text-transparent">
              App Preferences ⚙️
            </h2>
            <div className="space-y-6">
              {[
                { label: "Push Notifications 📱", checked: true },
                { label: "Daily Reminders ⏰", checked: true },
                { label: "Weekly Reports 📊", checked: false },
                { label: "Achievement Alerts 🏆", checked: true },
              ].map((pref, index) => (
                <div
                  key={pref.label}
                  className="flex items-center justify-between p-6 bg-surface-variant rounded-2xl border border-outline-variant hover:bg-surface-variant/80 transition-all duration-200"
                >
                  <span className="text-on-surface font-semibold">{pref.label}</span>
                  <input type="checkbox" defaultChecked={pref.checked} className="toggle" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "help" && (
        <div className="space-y-6">
          <div
            className={`bg-surface-container rounded-3xl p-8 shadow-xl border border-outline-variant transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="text-2xl font-bold text-on-surface mb-6">Help & Support 🤝</h2>
            <div className="space-y-4">
              {[
                "How to track meals effectively? 🍽️",
                "Understanding macro nutrients 🥗",
                "Setting realistic fitness goals 🎯",
                "Contact support team 📞",
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left p-6 bg-surface-variant rounded-2xl text-on-surface hover:bg-surface-variant/80 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg border border-outline-variant font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
