'use client'

import { CheckCircle } from 'lucide-react'

export default function StatusSummary() {
  return (
    <div className="bg-primary rounded-card p-5 flex flex-col justify-between h-full min-h-[120px]">
      <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
        Status Summary
      </p>
      <div className="flex items-end justify-between gap-2">
        <p className="text-sm font-bold text-white leading-snug">
          All systems<br />operational.
        </p>
        <CheckCircle size={24} className="text-white/80 shrink-0" />
      </div>
    </div>
  )
}
