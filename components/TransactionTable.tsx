'use client'

import { MoreVertical } from 'lucide-react'
import { Transaction } from '@/types/policy'

interface TransactionTableProps {
  transactions: Transaction[]
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-dark-border">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Fecha/Hora
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Wallet Address
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Red
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Monto (XLM)
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {' '}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dark-border">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-dark-border/20 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                {tx.date}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-300">
                {tx.walletAddress}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                {tx.protocol}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-white text-right font-semibold">
                {tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    tx.status === 'Aceptada'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-orange-500/20 text-orange-400'
                  }`}
                >
                  {tx.status}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right">
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
