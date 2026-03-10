'use client'

import { useState, useMemo } from 'react'
import { Calendar, Download, Search, SlidersHorizontal } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import StatCard from '@/components/StatCard'
import TransactionTable from '@/components/TransactionTable'
import ReportsPagination from '@/components/ReportsPagination'
import { Transaction, ReportStats } from '@/types/policy'

const STATS: ReportStats = {
  totalTransactions: 1284,
  totalGrowth: 12,
  accepted: 1150,
  acceptedGrowth: 10,
  rejected: 134,
  rejectedGrowth: -5,
  totalVolume: 45290.50,
  volumeGrowth: 18,
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1',  date: '2023-10-24 14:32:10', walletAddress: 'GB2V...K9S4', protocol: 'Stellar',    amount: 1250.00,  status: 'Aceptada' },
  { id: '2',  date: '2023-10-24 13:15:45', walletAddress: 'GCKJ...R3H2', protocol: 'Stellar',   amount: 840.50,   status: 'Aceptada' },
  { id: '3',  date: '2023-10-24 11:05:22', walletAddress: 'GDKP...22Z1', protocol: 'Stellar',   amount: 3000.00,  status: 'Aceptada' },
  { id: '4',  date: '2023-10-24 09:44:01', walletAddress: 'GAA8...99XW', protocol: 'Stellar',    amount: 120.00,   status: 'Rechazada' },
  { id: '5',  date: '2023-10-23 22:12:33', walletAddress: 'GBLA...55PP', protocol: 'Stellar',      amount: 15000.00, status: 'Aceptada' },
  { id: '6',  date: '2023-10-23 18:05:12', walletAddress: 'GCXM...77AA', protocol: 'Stellar',   amount: 500.00,   status: 'Aceptada' },
  { id: '7',  date: '2023-10-23 15:30:44', walletAddress: 'GDFF...11BB', protocol: 'Stellar',   amount: 2100.00,  status: 'Rechazada' },
  { id: '8',  date: '2023-10-23 12:22:18', walletAddress: 'GABC...44CC', protocol: 'Stellar',   amount: 780.00,   status: 'Aceptada' },
  { id: '9',  date: '2023-10-23 10:11:05', walletAddress: 'GBZZ...66DD', protocol: 'Stellar',    amount: 4500.00,  status: 'Aceptada' },
  { id: '10', date: '2023-10-23 08:00:33', walletAddress: 'GCPP...88EE', protocol: 'Stellar',      amount: 60.00,    status: 'Rechazada' },
  { id: '11', date: '2023-10-22 21:45:10', walletAddress: 'GDRR...22FF', protocol: 'Stellar',   amount: 9200.00,  status: 'Aceptada' },
  { id: '12', date: '2023-10-22 19:30:55', walletAddress: 'GANN...33GG', protocol: 'Stellar',   amount: 340.00,   status: 'Aceptada' },
  { id: '13', date: '2023-10-22 16:12:40', walletAddress: 'GBCC...44HH', protocol: 'Stellar',   amount: 1800.00,  status: 'Rechazada' },
  { id: '14', date: '2023-10-22 14:05:22', walletAddress: 'GDEE...55JJ', protocol: 'Stellar',    amount: 6700.00,  status: 'Aceptada' },
  { id: '15', date: '2023-10-22 11:00:18', walletAddress: 'GFFF...66KK', protocol: 'Stellar',      amount: 150.00,   status: 'Aceptada' },
]

type Tab = 'accepted' | 'rejected'
const PAGE_SIZE = 5

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('accepted')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const filteredTransactions = useMemo(() => {
    let list = MOCK_TRANSACTIONS.filter((tx) =>
      activeTab === 'accepted' ? tx.status === 'Aceptada' : tx.status === 'Rechazada'
    )
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (tx) =>
          tx.walletAddress.toLowerCase().includes(q) ||
          tx.protocol.toLowerCase().includes(q)
      )
    }
    return list
  }, [activeTab, searchQuery])

  const total = filteredTransactions.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageTransactions = filteredTransactions.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  )

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setPage(1)
  }

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-[240px] flex flex-col min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(true)} showAddPolicy={false} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Reportes</h1>
              <p className="text-sm text-gray-400">
                Visualiza y descarga el historial de transacciones de gobernanza
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-card border border-dark-border text-white text-sm font-medium hover:bg-dark-border transition-colors"
              >
                <Calendar size={16} />
                Último mes
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors"
              >
                <Download size={16} />
                Descargar CSV
              </button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Transacciones"
              value={STATS.totalTransactions.toLocaleString()}
              growth={STATS.totalGrowth}
            />
            <StatCard
              title="Transacciones Aceptadas"
              value={STATS.accepted.toLocaleString()}
              growth={STATS.acceptedGrowth}
            />
            <StatCard
              title="Transacciones Rechazadas"
              value={STATS.rejected.toLocaleString()}
              growth={STATS.rejectedGrowth}
            />
            <StatCard
              title="Volumen Total (XLM)"
              value={STATS.totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              growth={STATS.volumeGrowth}
            />
          </div>

          {/* Table card */}
          <div className="bg-dark-card rounded-card border border-dark-border shadow-card flex flex-col">
            {/* Tabs */}
            <div className="border-b border-dark-border">
              <div className="flex">
                <button
                  type="button"
                  onClick={() => handleTabChange('accepted')}
                  className={`px-5 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === 'accepted'
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Transacciones Aceptadas
                  {activeTab === 'accepted' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('rejected')}
                  className={`px-5 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === 'rejected'
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Transacciones Rechazadas
                  {activeTab === 'rejected' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
                  )}
                </button>
              </div>
            </div>

            {/* Search + filter */}
            <div className="p-4 border-b border-dark-border flex gap-3 items-center">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
                  placeholder="Buscar por Wallet Address o Red..."
                  className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <button
                type="button"
                className="p-2 rounded-lg bg-dark-border/80 text-gray-300 hover:bg-dark-border hover:text-white transition-colors"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>

            {/* Table */}
            <TransactionTable transactions={pageTransactions} />

            {/* Pagination */}
            <ReportsPagination
              currentPage={safePage}
              totalPages={totalPages}
              totalResults={total}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
