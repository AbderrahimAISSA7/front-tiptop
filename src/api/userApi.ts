import httpClient from './httpClient'
import type { User } from '../types/user'

export const fetchCurrentUser = async () => {
  const { data } = await httpClient.get<User>('/api/users/me')
  return data
}
