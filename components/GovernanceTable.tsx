'use client'

import { Trash2 } from 'lucide-react'
import { GovernancePolicy } from '@/types/policy'

interface GovernanceTableProps {
  policies: GovernancePolicy[]
  onToggleStatus: (id: string) => void
  onDelete: (id: string) => void
}

const protocolColors: Record<string, string> = {
  blue: 'bg-blue-500',
  orange: 'bg-amber-500',
  green: 'bg-emerald-500',
}

export default function GovernanceTable({ policies, onToggleStatus, onDelete }: GovernanceTableProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <table className="w-full min-w-[720px]">
        <thead>
          <tr className="border-b border-dark-border">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Protocol
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Policy Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Policy Value
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Last Modified
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dark-border">
          {policies.map((policy) => (
            <tr key={policy.id} className="hover:bg-dark-border/20 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                      protocolColors[policy.protocolColor] || 'bg-gray-500'
                    }`}
                  >
                    {policy.protocolIcon}
                  </div>
                  <span className="text-sm font-medium text-white">{policy.protocol}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-gray-300">{policy.policyDescription}</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="text-sm font-semibold text-white">
                  {policy.policyValue.toLocaleString()}
                </span>
                <span className="ml-2 inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-dark-border text-gray-300">
                  {policy.valueUnit}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                {policy.lastModified}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <button
                  onClick={() => onToggleStatus(policy.id)}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors ${
                      policy.status === 'enabled' ? 'bg-status-enabled' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        policy.status === 'enabled' ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      policy.status === 'enabled' ? 'text-status-enabled' : 'text-gray-400'
                    }`}
                  >
                    {policy.status === 'enabled' ? 'ENABLED' : 'DISABLED'}
                  </span>
                </button>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right">
                <button
                  onClick={() => onDelete(policy.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                  aria-label="Delete policy"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
