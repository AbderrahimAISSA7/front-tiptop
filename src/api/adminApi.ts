import httpClient from './httpClient'
import type {
  AdminStats,
  ParticipantSummary,
  AdminUser,
  AdminCode,
  PrizeSummary,
  CreateCodePayload,
} from '../types/admin'

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

export const fetchAdminUsers = async () => {
  const { data } = await httpClient.get<AdminUser[]>('/api/admin/users')
  return data
}

export const updateUserRole = async (userId: number, role: string) => {
  const { data } = await httpClient.patch<AdminUser>(`/api/admin/users/${userId}/role`, { role })
  return data
}

export const deleteUser = async (userId: number) => {
  await httpClient.delete(`/api/admin/users/${userId}`)
}

export const fetchAdminCodes = async () => {
  const { data } = await httpClient.get<AdminCode[]>('/api/admin/codes')
  return data
}

export const createCode = async (payload: CreateCodePayload) => {
  const { data } = await httpClient.post<AdminCode>('/api/admin/codes', payload)
  return data
}

export const updateCodeStatus = async (codeId: number, status: string) => {
  const { data } = await httpClient.patch<AdminCode>(`/api/admin/codes/${codeId}/status`, { status })
  return data
}

export const fetchPrizes = async () => {
  const { data } = await httpClient.get<PrizeSummary[]>('/api/admin/prizes')
  return data
}
