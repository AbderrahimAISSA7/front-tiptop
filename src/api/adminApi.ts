import httpClient from './httpClient'
import type { AdminStats, ParticipantSummary } from '../types/admin'

export const fetchAdminStats = async () => {
  const { data } = await httpClient.get<AdminStats>('/api/admin/stats')
  return data
}

export const fetchParticipants = async () => {
  const { data } = await httpClient.get<{ content: ParticipantSummary[]; totalElements: number }>(
    '/api/admin/participants',
  )
  return data
}
