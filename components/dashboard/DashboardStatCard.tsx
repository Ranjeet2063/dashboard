'use client'

import { LucideIcon } from 'lucide-react'

interface DashboardStatCardProps {
  title: string
  value: string
  growth: number
  icon: LucideIcon
  iconBg: string   /* tailwind class: bg-emerald-500, bg-amber-500, etc. */
}

export default function DashboardStatCard({
  title,
  value,
  growth,
  icon: Icon,
  iconBg,
}: DashboardStatCardProps) {
  const isPositive = growth > 0
  const isZero = growth === 0

  return (
    <div className="bg-dark-card border border-dark-border rounded-card p-4 flex flex-col gap-3 min-w-0">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
        <span
          className={`text-xs font-semibold ${
            isZero
              ? 'text-gray-400'
              : isPositive
              ? 'text-emerald-400'
              : 'text-red-400'
          }`}
        >
          {isZero ? '0%' : `${isPositive ? '+' : ''}${growth}%`}
          {isZero ? '—' : isPositive ? '↑' : '↓'}
        </span>
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  )
}
