'use client'

import { Search, Bell, Menu, User } from 'lucide-react'

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="h-14 lg:h-16 bg-dark-bg border-b border-dark-border flex items-center px-4 lg:px-6 gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-dark-border rounded-lg transition-colors text-gray-400"
      >
        <Menu size={20} />
      </button>

      <h1 className="text-lg font-bold text-white hidden lg:block whitespace-nowrap">
        Dashboard General
      </h1>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto lg:mx-0 lg:ml-8">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search data..."
            className="w-full pl-9 pr-4 py-2 bg-dark-card border border-dark-border rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="p-2 hover:bg-dark-border rounded-lg transition-colors text-gray-400">
          <Bell size={20} />
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs font-medium text-white leading-tight">Admin User</p>
            <p className="text-[10px] text-gray-400 uppercase leading-tight">Super Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/30 flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
        </div>
      </div>
    </header>
  )
}
