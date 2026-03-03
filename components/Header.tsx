'use client'

import { Menu, Plus } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-14 lg:h-16 bg-dark-bg border-b border-dark-border flex items-center justify-between px-4 lg:px-6 gap-3">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-dark-border rounded-lg transition-colors text-gray-400"
      >
        <Menu size={20} />
      </button>
      <div className="flex-1 min-w-0" />
      <div className="flex items-center gap-3">
        {/* Wallet pill: green avatar + truncated address */}
        <div className="hidden sm:flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full bg-dark-card border border-dark-border">
          <div className="w-7 h-7 rounded-full bg-emerald-500/90 flex items-center justify-center shrink-0" />
          <span className="text-sm font-medium text-white truncate max-w-[100px]">
            GD6NG...T55KR
          </span>
        </div>
        <Link
          href="/policies/new"
          className="inline-flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add New Policy
        </Link>
      </div>
    </header>
  )
}
