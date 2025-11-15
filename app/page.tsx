'use client'

import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import FilterButtons from '@/components/FilterButtons'
import PolicyTable from '@/components/PolicyTable'
import { Policy } from '@/types/policy'

// Datos mock de políticas
const mockPolicies: Policy[] = [
  {
    id: '1',
    name: 'Límite de Recepción de USDT',
    cryptocurrency: 'USDT',
    operationType: 'Recepción',
    limits: { min: 100, max: 5000 },
    periodicity: 'Diario',
    status: 'active',
  },
  {
    id: '2',
    name: 'Máximo de envío de USDT',
    cryptocurrency: 'USDT',
    operationType: 'Envío',
    limits: { min: 0, max: 10000 },
    periodicity: 'Por Transacción',
    status: 'active',
  },
  {
    id: '3',
    name: 'Frecuencia semanal de operaciones',
    cryptocurrency: 'USDT',
    operationType: 'Recepción / Envío',
    limits: { min: null, max: null },
    periodicity: 'Semanal (Max 5)',
    status: 'inactive',
  },
]

type FilterType = 'all' | 'USDT' | 'active'

export default function PoliciesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('USDT')
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Filtrar políticas según búsqueda y filtro seleccionado
  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      // Filtro de búsqueda
      const matchesSearch = policy.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

      // Filtro por criptomoneda o estado
      let matchesFilter = true
      if (selectedFilter === 'USDT') {
        matchesFilter = policy.cryptocurrency === selectedFilter
      } else if (selectedFilter === 'active') {
        matchesFilter = policy.status === 'active'
      }

      return matchesSearch && matchesFilter
    })
  }, [policies, searchQuery, selectedFilter])

  const handleToggleStatus = (id: string) => {
    setPolicies((prev) =>
      prev.map((policy) =>
        policy.id === id
          ? { ...policy, status: policy.status === 'active' ? 'inactive' : 'active' }
          : policy
      )
    )
  }

  const handleEdit = (id: string) => {
    console.log('Editar política:', id)
    // Aquí iría la lógica para editar
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta política?')) {
      setPolicies((prev) => prev.filter((policy) => policy.id !== id))
    }
  }


  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Header Section */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Políticas de Gobernanza AML - Criptoactivos
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Define y gestiona las reglas que controlan las operaciones con criptomonedas
              para prevenir el lavado de dinero.
            </p>
          </div>

          {/* Action Button */}
          <div className="mb-6">
            <Link
              href="/policies/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-dark-bg font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              <Plus size={20} />
              Crear Nueva Política
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterButtons
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>

          {/* Policies Table */}
          <PolicyTable
            policies={filteredPolicies}
            onToggleStatus={handleToggleStatus}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  )
}

