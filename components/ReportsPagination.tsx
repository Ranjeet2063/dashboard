'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ReportsPaginationProps {
  currentPage: number
  totalPages: number
  totalResults: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function ReportsPagination({
  currentPage,
  totalPages,
  totalResults,
  pageSize,
  onPageChange,
}: ReportsPaginationProps) {
  const from = (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, totalResults)

  const getVisiblePages = () => {
    const pages: number[] = []
    const maxVisible = 3
    let start = Math.max(1, currentPage - 1)
    const end = Math.min(totalPages, start + maxVisible - 1)
    start = Math.max(1, end - maxVisible + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-dark-border">
      <p className="text-sm text-gray-400">
        Mostrando {from}-{to} de {totalResults.toLocaleString()} resultados
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-2 rounded-lg text-gray-400 hover:bg-dark-border hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        {getVisiblePages().map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              p === currentPage
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:bg-dark-border hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-lg text-gray-400 hover:bg-dark-border hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
