'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type FilterType = 'all' | 'USDT' | 'active'

interface FilterButtonsProps {
  selectedFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export default function FilterButtons({ selectedFilter, onFilterChange }: FilterButtonsProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  const filters = [
    { id: 'all' as FilterType, label: 'Todas' },
    { id: 'USDT' as FilterType, label: 'USDT' },
  ]

  return (
    <div className="flex items-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedFilter === filter.id
              ? 'bg-primary text-dark-bg'
              : 'bg-dark-card text-gray-300 hover:bg-dark-border hover:text-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-dark-card text-gray-300 hover:bg-dark-border hover:text-white flex items-center gap-2 transition-colors"
        >
          Activa
          <ChevronDown size={16} />
        </button>
        {showDropdown && (
          <div className="absolute top-full mt-2 right-0 bg-dark-card border border-dark-border rounded-lg shadow-lg min-w-[120px] z-10">
            <button
              onClick={() => {
                onFilterChange('active')
                setShowDropdown(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-border hover:text-white rounded-t-lg"
            >
              Activas
            </button>
            <button
              onClick={() => {
                onFilterChange('all')
                setShowDropdown(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-border hover:text-white rounded-b-lg"
            >
              Todas
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

