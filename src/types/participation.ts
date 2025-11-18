import type { Prize } from './prize'

export type Participation = {
  id: number
  code: {
    id: number
    code: string
    status: string
    prize?: Prize
  }
  prize?: Prize
  createdAt?: string
}

export type ParticipationRequest = {
  code: string
}
