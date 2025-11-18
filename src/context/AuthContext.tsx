import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types/user'
import { loginRequest, registerRequest } from '../api/authApi'
import { fetchCurrentUser } from '../api/userApi'
import type { LoginPayload, RegisterPayload } from '../types/auth'

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const saveAuth = (token: string, userData: User) => {
    localStorage.setItem('tiptop_token', token)
    setUser(userData)
  }

  const handleLogin = async (payload: LoginPayload) => {
    const data = await loginRequest(payload)
    saveAuth(data.token, data.user)
  }

  const handleRegister = async (payload: RegisterPayload) => {
    const data = await registerRequest(payload)
    saveAuth(data.token, data.user)
  }

  const logout = () => {
    localStorage.removeItem('tiptop_token')
    setUser(null)
  }

  const refreshUser = async () => {
    try {
      const fetched = await fetchCurrentUser()
      setUser(fetched)
    } catch (error) {
      logout()
      throw error
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('tiptop_token')
    if (!token) {
      setIsLoading(false)
      return
    }
    fetchCurrentUser()
      .then((data) => setUser(data))
      .catch(() => logout())
      .finally(() => setIsLoading(false))
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login: handleLogin,
      register: handleRegister,
      logout,
      refreshUser,
    }),
    [user, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
