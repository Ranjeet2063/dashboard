'use client'

import { LucideIcon, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface QuickActionCardProps {
  icon: LucideIcon
  title: string
  subtitle: string
  href: string
}

export default function QuickActionCard({ icon: Icon, title, subtitle, href }: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="bg-dark-card border border-dark-border rounded-card p-4 flex items-center gap-4 hover:bg-dark-border/40 transition-colors group"
    >
      <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
        <Icon size={22} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <ChevronRight size={20} className="text-gray-500 group-hover:text-white transition-colors shrink-0" />
    </Link>
  )
}
