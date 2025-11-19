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

export type AdminUser = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: 'USER' | 'ADMIN'
  createdAt?: string
}

export type AdminCode = {
  id: number
  code: string
  status: string
  expirationDate?: string
  issueDate?: string
  useDate?: string
  createdAt?: string
  updatedAt?: string
  prize?: {
    id: number
    name: string
  }
}

export type PrizeSummary = {
  id: number
  name: string
}

export type CreateCodePayload = {
  code: string
  prizeId: number
  expirationDate?: string
  status?: string
}
