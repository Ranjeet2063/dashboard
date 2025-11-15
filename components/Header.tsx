'use client'

import { Bell, LogOut, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-between px-4 lg:px-6 gap-4">
      <button 
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-dark-border rounded-lg transition-colors"
      >
        <Menu size={20} className="text-gray-300" />
      </button>
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 hover:bg-dark-border rounded-lg transition-colors">
          <Bell size={20} className="text-gray-300" />
        </button>
        <button className="p-2 hover:bg-dark-border rounded-lg transition-colors">
          <LogOut size={20} className="text-gray-300" />
        </button>
      </div>
    </header>
  )
}

