import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Telegram theme colors
        "tg-bg": "var(--tg-theme-bg-color)",
        "tg-text": "var(--tg-theme-text-color)",
        "tg-hint": "var(--tg-theme-hint-color)",
        "tg-link": "var(--tg-theme-link-color)",
        "tg-button": "var(--tg-theme-button-color)",
        "tg-button-text": "var(--tg-theme-button-text-color)",
        "tg-secondary": "var(--tg-theme-secondary-bg-color)",

        // Fitness-inspired color system
        "primary-container": "var(--fitness-primary-container)",
        "on-primary": "var(--fitness-on-primary)",
        "on-primary-container": "var(--fitness-on-primary-container)",

        "secondary-container": "var(--fitness-secondary-container)",
        "on-secondary": "var(--fitness-on-secondary)",
        "on-secondary-container": "var(--fitness-on-secondary-container)",

        tertiary: "var(--fitness-tertiary)",
        "tertiary-container": "var(--fitness-tertiary-container)",
        "on-tertiary": "var(--fitness-on-tertiary)",
        "on-tertiary-container": "var(--fitness-on-tertiary-container)",

        "accent-container": "var(--fitness-accent-container)",
        "on-accent": "var(--fitness-on-accent)",
        "on-accent-container": "var(--fitness-on-accent-container)",

        success: "var(--fitness-success)",
        "success-container": "var(--fitness-success-container)",
        "on-success": "var(--fitness-on-success)",
        "on-success-container": "var(--fitness-on-success-container)",

        warning: "var(--fitness-warning)",
        "warning-container": "var(--fitness-warning-container)",
        "on-warning": "var(--fitness-on-warning)",
        "on-warning-container": "var(--fitness-on-warning-container)",

        error: "var(--fitness-error)",
        "error-container": "var(--fitness-error-container)",
        "on-error": "var(--fitness-on-error)",
        "on-error-container": "var(--fitness-on-error-container)",

        surface: "var(--fitness-surface)",
        "surface-container": "var(--fitness-surface-container)",
        "surface-variant": "var(--fitness-surface-variant)",
        "on-surface": "var(--fitness-on-surface)",
        "on-surface-variant": "var(--fitness-on-surface-variant)",

        outline: "var(--fitness-outline)",
        "outline-variant": "var(--fitness-outline-variant)",

        // Macro-specific colors
        protein: "var(--fitness-protein)",
        "protein-container": "var(--fitness-protein-container)",
        carbs: "var(--fitness-carbs)",
        "carbs-container": "var(--fitness-carbs-container)",
        fat: "var(--fitness-fat)",
        "fat-container": "var(--fitness-fat-container)",
        fiber: "var(--fitness-fiber)",
        "fiber-container": "var(--fitness-fiber-container)",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
      },
      backgroundImage: {
        "gradient-fitness-primary": "linear-gradient(135deg, var(--fitness-primary), var(--fitness-secondary))",
        "gradient-fitness-energy": "linear-gradient(135deg, var(--fitness-tertiary), var(--fitness-accent))",
        "gradient-fitness-health": "linear-gradient(135deg, var(--fitness-secondary), var(--fitness-success))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

export default config
