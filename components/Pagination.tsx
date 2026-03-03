'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  from: number
  to: number
  total: number
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}

export default function Pagination({
  from,
  to,
  total,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-dark-border">
      <p className="text-sm text-gray-400">
        Showing {from} to {to} of {total} policies
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="p-2 rounded-lg border border-dark-border text-gray-400 hover:bg-dark-border hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="p-2 rounded-lg border border-dark-border text-gray-400 hover:bg-dark-border hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
