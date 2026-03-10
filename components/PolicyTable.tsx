'use client'

import { Edit, Trash2, MoreVertical } from 'lucide-react'
import { Policy } from '@/types/policy'

interface PolicyTableProps {
  policies: Policy[]
  onToggleStatus: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function PolicyTable({ 
  policies, 
  onToggleStatus, 
  onEdit, 
  onDelete 
}: PolicyTableProps) {
  const formatLimits = (min: number | null, max: number | null) => {
    if (min === null && max === null) return 'N/A'
    const minStr = min !== null ? `$${min.toLocaleString()}` : '$0'
    const maxStr = max !== null ? `$${max.toLocaleString()}` : '∞'
    return `${minStr} - ${maxStr}`
  }

  return (
    <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-[800px]">
          <thead className="bg-dark-border/50">
            <tr>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Nombre de la Política
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Criptomoneda
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Tipo Operación
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Límites (USD)
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Periodicidad
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border">
            {policies.map((policy) => (
              <tr key={policy.id} className="hover:bg-dark-border/30 transition-colors">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{policy.name}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded">
                    {policy.cryptocurrency}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {policy.operationType}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatLimits(policy.limits.min, policy.limits.max)}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {policy.periodicity}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onToggleStatus(policy.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      policy.status === 'active' ? 'bg-primary' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        policy.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <button
                      onClick={() => onEdit(policy.id)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                      aria-label="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(policy.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      aria-label="Más opciones"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

