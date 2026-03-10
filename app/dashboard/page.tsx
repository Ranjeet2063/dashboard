'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  ArrowRightLeft,
  Layers,
  FileText,
  BarChart3,
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardStatCard from '@/components/dashboard/DashboardStatCard'
import ActivityChart from '@/components/dashboard/ActivityChart'
import EventsList from '@/components/dashboard/EventsList'
import QuickActionCard from '@/components/dashboard/QuickActionCard'
import StatusSummary from '@/components/dashboard/StatusSummary'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-[240px] flex flex-col min-h-screen">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <DashboardStatCard
              title="Total Políticas"
              value="124"
              growth={5}
              icon={ShieldCheck}
              iconBg="bg-emerald-500"
            />
            <DashboardStatCard
              title="Transacciones Hoy"
              value="8.5k"
              growth={-2}
              icon={ArrowRightLeft}
              iconBg="bg-amber-500"
            />
            <DashboardStatCard
              title="Protocolos Activos"
              value="12"
              growth={0}
              icon={Layers}
              iconBg="bg-primary"
            />
          </div>

          {/* Chart + Events */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2">
              <ActivityChart />
            </div>
            <div>
              <EventsList />
            </div>
          </div>

          {/* Quick actions + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              icon={FileText}
              title="Gestionar Políticas"
              subtitle="Ajustar reglas de cumplimiento"
              href="/"
            />
            <QuickActionCard
              icon={BarChart3}
              title="Generar Reportes"
              subtitle="Exportar analíticas avanzadas"
              href="/reports"
            />
            <StatusSummary />
          </div>
        </main>
      </div>
    </div>
  )
}
