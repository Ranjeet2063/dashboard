'use client'

import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  User,
  X,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Políticas de Gobernanza', href: '/' },
  { icon: BarChart3, label: 'Reportes', href: '/reports' },
  { icon: Settings, label: 'Configuración', href: '/settings' },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[240px] bg-dark-sidebar border-r border-dark-border flex flex-col z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo FORTGATE (escudo + nombre) */}
        <div className="p-5 border-b border-dark-border flex items-center justify-between">
          <Link href="/" className="flex items-center min-w-0">
            <Image
              src="/fortgate.png"
              alt="FORTGATE"
              width={160}
              height={36}
              className="h-9 w-auto object-contain object-left"
              priority
            />
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-dark-border rounded-lg transition-colors text-gray-400"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive =
                item.href === '/'
                  ? pathname === '/' || pathname.startsWith('/policies')
                  : pathname.startsWith(item.href)
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary/15 text-white border-l-2 border-primary'
                        : 'text-gray-400 hover:bg-dark-border/60 hover:text-white border-l-2 border-transparent'
                    }`}
                  >
                    <Icon size={20} className={`shrink-0 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-3 border-t border-dark-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-dark-border flex items-center justify-center shrink-0">
              <User size={16} className="text-gray-400" />
            </div>
            <span className="text-sm font-medium text-white truncate">Admin User</span>
          </div>
          <Link
            href="/help"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white transition-colors rounded-lg"
          >
            <HelpCircle size={18} className="shrink-0" />
            <span className="text-sm">Ayuda</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
