import httpClient from './httpClient'
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth'

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await httpClient.post<AuthResponse>('/api/auth/login', payload)
  return data
}

export const registerRequest = async (payload: RegisterPayload) => {
  const { data } = await httpClient.post<AuthResponse>('/api/auth/register', payload)
  return data
}
