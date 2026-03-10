'use client'

interface StatCardProps {
  title: string
  value: string
  growth: number
}

export default function StatCard({ title, value, growth }: StatCardProps) {
  const isPositive = growth >= 0

  return (
    <div className="bg-dark-card border border-dark-border rounded-card p-4 flex flex-col gap-2 min-w-0">
      <span className="text-xs text-gray-400 font-medium">{title}</span>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span
          className={`text-xs font-semibold ${
            isPositive ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {isPositive ? '+' : ''}{growth}%{isPositive ? '↑' : '↓'}
        </span>
      </div>
    </div>
  )
}
