export type AdminStats = {
  totalCodes: number
  usedCodes: number
  prizeDistribution: {
    prizeName: string
    count: number
  }[]
}

export type ParticipantSummary = {
  id: number
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
  code: {
    code: string
  }
  prize?: {
    name: string
  }
  createdAt?: string
}
