export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar?: string | null
  role: 'USER' | 'ADMIN'
  createdAt?: string
}
