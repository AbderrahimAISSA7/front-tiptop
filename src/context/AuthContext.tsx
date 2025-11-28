/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types/user'
import { loginRequest, registerRequest } from '../api/authApi'
import { deleteCurrentUser, fetchCurrentUser } from '../api/userApi'
import type { LoginPayload, RegisterPayload } from '../types/auth'

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
  deleteAccount: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const saveAuth = useCallback((token: string, userData: User) => {
    localStorage.setItem('tiptop_token', token)
    setUser(userData)
  }, [])

  const handleLogin = useCallback(async (payload: LoginPayload) => {
    const data = await loginRequest(payload)
    saveAuth(data.token, data.user)
  }, [saveAuth])

  const handleRegister = useCallback(async (payload: RegisterPayload) => {
    const data = await registerRequest(payload)
    saveAuth(data.token, data.user)
  }, [saveAuth])

  const logout = useCallback(() => {
    localStorage.removeItem('tiptop_token')
    setUser(null)
  }, [])

  const deleteAccount = useCallback(async () => {
    await deleteCurrentUser()
    logout()
  }, [logout])

  const refreshUser = useCallback(async () => {
    try {
      const fetched = await fetchCurrentUser()
      setUser(fetched)
    } catch (error) {
      logout()
      throw error
    }
  }, [logout])

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('tiptop_token')
      if (!token) {
        setIsLoading(false)
        return
      }
      try {
        const data = await fetchCurrentUser()
        setUser(data)
      } catch {
        logout()
      } finally {
        setIsLoading(false)
      }
    }
    void init()
  }, [logout])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login: handleLogin,
      register: handleRegister,
      logout,
      deleteAccount,
      refreshUser,
    }),
    [user, isLoading, handleLogin, handleRegister, logout, deleteAccount, refreshUser],
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
