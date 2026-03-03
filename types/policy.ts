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
  protocolIcon: string  /* single letter or icon key: Blend, Soroban, etc. */
  protocolColor: string /* tailwind or hex: blue, orange, green */
  policyDescription: string
  policyValue: number
  valueUnit: string     /* e.g. "XLM", "Units" */
  lastModified: string /* e.g. "Oct 24, 2023" */
  status: GovernanceStatus
}

