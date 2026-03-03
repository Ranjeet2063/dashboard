'use client'

import { useState, useMemo } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import GovernanceTable from '@/components/GovernanceTable'
import Pagination from '@/components/Pagination'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'
import { Filter, Download } from 'lucide-react'
import { usePolicies } from '@/context/PolicyContext'

const PAGE_SIZE = 5

export default function PoliciesPage() {
  const { policies, toggleStatus, deletePolicy } = usePolicies()
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [page, setPage] = useState(1)

  const filteredPolicies = useMemo(() => {
    if (!searchQuery.trim()) return policies
    const q = searchQuery.toLowerCase()
    return policies.filter(
      (p) =>
        p.protocol.toLowerCase().includes(q) ||
        p.policyDescription.toLowerCase().includes(q)
    )
  }, [policies, searchQuery])

  const total = filteredPolicies.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const safePage = Math.min(page, totalPages || 1)
  const from = (safePage - 1) * PAGE_SIZE + 1
  const to = Math.min(safePage * PAGE_SIZE, total)
  const pagePolicies = useMemo(
    () => filteredPolicies.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filteredPolicies, safePage]
  )

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-[240px] flex flex-col min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Políticas de Gobernanza
            </h1>
            <p className="text-sm text-gray-400">
              Manage and monitor protocol-level control parameters.
            </p>
          </div>

          <div className="bg-dark-card rounded-card border border-dark-border shadow-card flex flex-col flex-1 min-h-0">
            <div className="p-4 border-b border-dark-border flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex-1 w-full">
                <SearchBar
                  value={searchQuery}
                  onChange={(v) => { setSearchQuery(v); setPage(1) }}
                  placeholder="Search policies or protocols..."
                />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-border/80 text-white text-sm font-medium hover:bg-dark-border transition-colors"
                >
                  <Filter size={18} />
                  Filters
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-border/80 text-white text-sm font-medium hover:bg-dark-border transition-colors"
                >
                  <Download size={18} />
                  Export
                </button>
              </div>
            </div>

            <GovernanceTable
              policies={pagePolicies}
              onToggleStatus={toggleStatus}
              onDelete={deletePolicy}
            />

            <Pagination
              from={total === 0 ? 0 : from}
              to={to}
              total={total}
              hasPrev={safePage > 1}
              hasNext={safePage * PAGE_SIZE < total}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          </div>

          <Footer />
        </main>
      </div>

      <ThemeToggle />
    </div>
  )
}
