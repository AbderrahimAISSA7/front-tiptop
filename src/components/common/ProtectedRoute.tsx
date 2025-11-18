import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../../context/AuthContext'

type Props = {
  children: ReactNode
  role?: 'ADMIN'
}

const ProtectedRoute = ({ children, role }: Props) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="page-loading">Chargement...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
