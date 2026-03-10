export type OperationType = 'Recepción' | 'Envío' | 'Recepción / Envío'
export type Cryptocurrency = 'USDT' | 'BTC' | 'ETH'
export type Periodicity = 'Diario' | 'Semanal' | 'Por Transacción' | string
export type Status = 'active' | 'inactive'

export interface Policy {
  id: string
  name: string
  cryptocurrency: Cryptocurrency
  operationType: OperationType
  limits: {
    min: number | null
    max: number | null
  }
  periodicity: Periodicity
  status: Status
}

/** Governance table row (protocol-level policies) */
export type GovernanceStatus = 'enabled' | 'disabled'

export interface GovernancePolicy {
  id: string
  protocol: string
  protocolIcon: string
  protocolColor: string
  policyDescription: string
  policyValue: number
  valueUnit: string
  lastModified: string
  status: GovernanceStatus
}

/** Transactions for Reports */
export type TransactionStatus = 'Aceptada' | 'Rechazada'

export interface Transaction {
  id: string
  date: string
  walletAddress: string
  protocol: string
  amount: number
  status: TransactionStatus
}

export interface ReportStats {
  totalTransactions: number
  totalGrowth: number
  accepted: number
  acceptedGrowth: number
  rejected: number
  rejectedGrowth: number
  totalVolume: number
  volumeGrowth: number
}

