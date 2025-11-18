import httpClient from './httpClient'
import type { Participation, ParticipationRequest } from '../types/participation'

export const submitCode = async (payload: ParticipationRequest) => {
  const { data } = await httpClient.post<Participation>('/api/participations', payload)
  return data
}

export const fetchMyParticipations = async () => {
  const { data } = await httpClient.get<Participation[]>('/api/participations/me')
  return data
}
