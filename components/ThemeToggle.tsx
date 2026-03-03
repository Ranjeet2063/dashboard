'use client'

import { Sun } from 'lucide-react'

export default function ThemeToggle() {
  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-border transition-colors shadow-card"
      aria-label="Toggle theme"
    >
      <Sun size={20} />
    </button>
  )
}
