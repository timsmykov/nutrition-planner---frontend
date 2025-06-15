"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Coffee, Sun, Moon, Cookie, Droplets, TrendingUp, Zap } from "lucide-react"

interface MealItem {
  id: string
  name: string
  calories: number
}

interface Meal {
  type: "breakfast" | "lunch" | "dinner" | "snack"
  label: string
  icon: any
  items: MealItem[]
  color: string
  bgColor: string
}

const mockMeals: Meal[] = [
  {
    type: "breakfast",
    label: "Breakfast",
    icon: Coffee,
    items: [
      { id: "1", name: "Oatmeal with berries", calories: 320 },
      { id: "2", name: "Greek yogurt", calories: 150 },
    ],
    color: "text-tertiary",
    bgColor: "bg-tertiary-container",
  },
  {
    type: "lunch",
    label: "Lunch",
    icon: Sun,
    items: [{ id: "3", name: "Grilled chicken salad", calories: 450 }],
    color: "text-secondary",
    bgColor: "bg-secondary-container",
  },
  {
    type: "dinner",
    label: "Dinner",
    icon: Moon,
    items: [],
    color: "text-accent",
    bgColor: "bg-accent-container",
  },
  {
    type: "snack",
    label: "Snack",
    icon: Cookie,
    items: [{ id: "4", name: "Apple with almonds", calories: 180 }],
    color: "text-primary",
    bgColor: "bg-primary-container",
  },
]

export default function DashboardScreen() {
  const [meals, setMeals] = useState<Meal[]>(mockMeals)
  const [waterGlasses, setWaterGlasses] = useState(5)
  const [animateWater, setAnimateWater] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const totalCalories = meals.reduce(
    (total, meal) => total + meal.items.reduce((mealTotal, item) => mealTotal + item.calories, 0),
    0,
  )

  const dailyGoals = {
    calories: {
      current: totalCalories,
      target: 2000,
      color: "from-tertiary to-accent",
      bgColor: "bg-tertiary-container",
    },
    protein: { current: 85, target: 120, color: "from-protein to-error", bgColor: "bg-protein-container" },
    carbs: { current: 180, target: 250, color: "from-carbs to-primary", bgColor: "bg-carbs-container" },
    fat: { current: 65, target: 80, color: "from-fat to-warning", bgColor: "bg-fat-container" },
  }

  const addWaterGlass = () => {
    if (waterGlasses < 8) {
      setWaterGlasses((prev) => prev + 1)
      setAnimateWater(true)
      setTimeout(() => setAnimateWater(false), 300)
    }
  }

  const removeMealItem = (mealType: string, itemId: string) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.type === mealType ? { ...meal, items: meal.items.filter((item) => item.id !== itemId) } : meal,
      ),
    )
  }

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-surface via-surface to-primary-container/5 min-h-screen">
      {/* Header */}
      <div
        className={`text-center transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <h1 className="text-3xl font-bold text-on-surface mb-2 tracking-tight bg-gradient-fitness-primary bg-clip-text text-transparent">
          Good morning, Alex! 💪
        </h1>
        <p className="text-on-surface-variant text-base font-medium">{currentDate}</p>
      </div>

      {/* Daily Goals Card - Fitness Theme */}
      <div
        className={`bg-surface-container rounded-3xl p-8 shadow-xl border border-outline-variant transition-all duration-700 delay-100 hover:shadow-2xl hover:-translate-y-1 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-on-surface">Daily Goals</h2>
          <div className="flex items-center space-x-2 text-success bg-success-container px-4 py-2 rounded-full">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-bold">On Track! 🎯</span>
          </div>
        </div>
        <div className="space-y-6">
          {Object.entries(dailyGoals).map(([key, goal], index) => {
            const percentage = Math.min((goal.current / goal.target) * 100, 100)
            return (
              <div key={key} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="capitalize font-bold text-on-surface text-lg">{key}</span>
                  <span className="text-on-surface-variant font-semibold bg-surface-variant px-3 py-1 rounded-full">
                    {goal.current}/{goal.target} {key === "calories" ? "kcal" : "g"}
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-surface-variant rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className={`bg-gradient-to-r ${goal.color} h-4 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
                      style={{
                        width: `${percentage}%`,
                        animationDelay: `${index * 200}ms`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm font-bold ${percentage >= 100 ? "text-success" : "text-on-surface-variant"}`}
                  >
                    {Math.round(percentage)}% complete
                  </span>
                  {percentage >= 100 && <span className="text-success">✅ Goal Achieved!</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Water Intake - Enhanced Fitness Theme */}
      <div
        className={`bg-gradient-to-br from-surface-container to-primary-container/20 rounded-3xl p-8 shadow-xl border border-outline-variant transition-all duration-700 delay-200 hover:shadow-2xl hover:-translate-y-1 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary rounded-2xl shadow-lg">
              <Droplets className="w-6 h-6 text-on-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface">Hydration Station 💧</h2>
              <p className="text-sm text-on-surface-variant">Stay hydrated, stay strong!</p>
            </div>
          </div>
          <button
            onClick={addWaterGlass}
            disabled={waterGlasses >= 8}
            className="bg-gradient-fitness-primary text-on-primary p-4 rounded-full hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl animate-pulse-glow"
            aria-label="Add water glass"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center justify-center space-x-3 mb-6">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`w-8 h-12 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 ${
                i < waterGlasses
                  ? "bg-gradient-to-t from-primary to-secondary border-primary shadow-lg"
                  : "border-outline bg-surface-variant"
              } ${animateWater && i === waterGlasses - 1 ? "animate-bounce" : ""}`}
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
          <div className="ml-4 p-2 bg-primary-container rounded-full">
            <Zap className="w-6 h-6 text-primary animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-on-surface mb-1">{waterGlasses}/8 glasses</p>
          <p className="text-sm text-on-surface-variant">
            {waterGlasses >= 8 ? "Hydration Champion! 🏆" : `${8 - waterGlasses} more to reach your goal!`}
          </p>
        </div>
      </div>

      {/* Meals - Fitness-Themed Cards */}
      <div className="space-y-6">
        {meals.map((meal, mealIndex) => {
          const Icon = meal.icon
          const totalCalories = meal.items.reduce((sum, item) => sum + item.calories, 0)

          return (
            <div
              key={meal.type}
              className={`bg-surface-container rounded-3xl p-8 shadow-xl border border-outline-variant hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ animationDelay: `${(mealIndex + 3) * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 ${meal.bgColor} rounded-2xl shadow-lg`}>
                    <Icon className={`w-7 h-7 ${meal.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">{meal.label}</h3>
                    <p className="text-sm text-on-surface-variant font-medium">
                      {totalCalories} kcal • {meal.items.length} items
                    </p>
                  </div>
                </div>
                <button className="bg-gradient-fitness-primary text-on-primary px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl">
                  Add Food +
                </button>
              </div>

              {meal.items.length > 0 ? (
                <div className="space-y-3">
                  {meal.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-4 px-6 bg-surface-variant rounded-2xl hover:bg-surface-variant/80 transition-all duration-200 group hover:scale-[1.02]"
                      style={{ animationDelay: `${itemIndex * 100}ms` }}
                    >
                      <div className="flex-1">
                        <p className="text-base font-semibold text-on-surface">{item.name}</p>
                        <p className="text-sm text-on-surface-variant font-medium">{item.calories} kcal</p>
                      </div>
                      <button
                        onClick={() => removeMealItem(meal.type, item.id)}
                        className="text-error hover:text-error/80 p-3 rounded-full hover:bg-error-container transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-md"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div
                    className={`w-16 h-16 ${meal.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <Icon className={`w-8 h-8 ${meal.color}`} />
                  </div>
                  <p className="text-on-surface-variant font-semibold mb-2">No items added yet</p>
                  <p className="text-sm text-on-surface-variant">Tap "Add Food +" to fuel your fitness journey!</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
