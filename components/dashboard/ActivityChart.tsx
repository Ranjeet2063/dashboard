'use client'

import { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const weeklyData = [
  { day: 'MON', accepted: 40, rejected: 20 },
  { day: 'TUE', accepted: 55, rejected: 25 },
  { day: 'WED', accepted: 70, rejected: 30 },
  { day: 'THU', accepted: 60, rejected: 45 },
  { day: 'FRI', accepted: 85, rejected: 35 },
  { day: 'SAT', accepted: 75, rejected: 40 },
  { day: 'SUN', accepted: 65, rejected: 30 },
]

const monthlyData = [
  { day: 'W1', accepted: 280, rejected: 120 },
  { day: 'W2', accepted: 350, rejected: 140 },
  { day: 'W3', accepted: 310, rejected: 100 },
  { day: 'W4', accepted: 420, rejected: 160 },
]

type Period = 'weekly' | 'monthly'

export default function ActivityChart() {
  const [period, setPeriod] = useState<Period>('monthly')
  const data = period === 'weekly' ? weeklyData : monthlyData

  return (
    <div className="bg-dark-card border border-dark-border rounded-card p-5 flex flex-col">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-white">Governance Activity</h2>
          <p className="text-xs text-gray-400">
            Accepted vs Rejected Transactions (Last 7 Days)
          </p>
        </div>
        <div className="flex bg-dark-border/60 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setPeriod('weekly')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              period === 'weekly'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            WEEKLY
          </button>
          <button
            type="button"
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              period === 'monthly'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            MONTHLY
          </button>
        </div>
      </div>

      <div className="h-[240px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradAccepted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradRejected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748b" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#64748b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2640" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#221c2e',
                border: '1px solid #2d2640',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#94a3b8' }}
            />
            <Area
              type="monotone"
              dataKey="accepted"
              stroke="#7c3aed"
              strokeWidth={2}
              fill="url(#gradAccepted)"
              name="Accepted Transactions"
            />
            <Area
              type="monotone"
              dataKey="rejected"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="6 3"
              fill="url(#gradRejected)"
              name="Rejected Transactions"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-gray-400">Accepted Transactions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gray-500" />
          <span className="text-xs text-gray-400">Rejected Transactions</span>
        </div>
      </div>
    </div>
  )
}
