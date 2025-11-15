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

