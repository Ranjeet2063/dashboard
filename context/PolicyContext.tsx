'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { GovernancePolicy, GovernanceStatus } from '@/types/policy'

const INITIAL_POLICIES: GovernancePolicy[] = [
  {
    id: '1',
    protocol: 'Blend',
    protocolIcon: 'B',
    protocolColor: 'blue',
    policyDescription: 'Max deposit amount per wallet',
    policyValue: 5000,
    valueUnit: 'XLM',
    lastModified: 'Oct 24, 2023',
    status: 'enabled',
  },
  {
    id: '2',
    protocol: 'Blend',
    protocolIcon: 'B',
    protocolColor: 'orange',
    policyDescription: 'Max concurrent positions per user',
    policyValue: 2,
    valueUnit: 'Units',
    lastModified: 'Oct 24, 2023',
    status: 'enabled',
  },
  {
    id: '3',
    protocol: 'Soroban',
    protocolIcon: 'S',
    protocolColor: 'green',
    policyDescription: 'Single transaction cap',
    policyValue: 50000,
    valueUnit: 'XLM',
    lastModified: 'Oct 20, 2023',
    status: 'disabled',
  },
  {
    id: '4',
    protocol: 'Blend',
    protocolIcon: 'B',
    protocolColor: 'blue',
    policyDescription: 'Daily withdrawal limit',
    policyValue: 10000,
    valueUnit: 'XLM',
    lastModified: 'Oct 18, 2023',
    status: 'enabled',
  },
  {
    id: '5',
    protocol: 'Soroban',
    protocolIcon: 'S',
    protocolColor: 'green',
    policyDescription: 'Max contracts per account',
    policyValue: 5,
    valueUnit: 'Units',
    lastModified: 'Oct 15, 2023',
    status: 'disabled',
  },
  {
    id: '6',
    protocol: 'Blend',
    protocolIcon: 'B',
    protocolColor: 'orange',
    policyDescription: 'Minimum collateral ratio',
    policyValue: 150,
    valueUnit: '%',
    lastModified: 'Oct 12, 2023',
    status: 'enabled',
  },
]

interface PolicyContextValue {
  policies: GovernancePolicy[]
  addPolicy: (policy: Omit<GovernancePolicy, 'id' | 'lastModified'>) => void
  toggleStatus: (id: string) => void
  deletePolicy: (id: string) => void
}

const PolicyContext = createContext<PolicyContextValue | null>(null)

export function PolicyProvider({ children }: { children: ReactNode }) {
  const [policies, setPolicies] = useState<GovernancePolicy[]>(INITIAL_POLICIES)

  const addPolicy = (data: Omit<GovernancePolicy, 'id' | 'lastModified'>) => {
    const now = new Date()
    const formatted = now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    const newPolicy: GovernancePolicy = {
      ...data,
      id: crypto.randomUUID(),
      lastModified: formatted,
    }
    setPolicies((prev) => [newPolicy, ...prev])
  }

  const toggleStatus = (id: string) => {
    setPolicies((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: (p.status === 'enabled' ? 'disabled' : 'enabled') as GovernanceStatus }
          : p
      )
    )
  }

  const deletePolicy = (id: string) => {
    setPolicies((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <PolicyContext.Provider value={{ policies, addPolicy, toggleStatus, deletePolicy }}>
      {children}
    </PolicyContext.Provider>
  )
}

export function usePolicies() {
  const ctx = useContext(PolicyContext)
  if (!ctx) throw new Error('usePolicies must be used within PolicyProvider')
  return ctx
}
