import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import HomePage from '../pages/Home/HomePage'
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import DashboardPage from '../pages/User/DashboardPage'
import EnterCodePage from '../pages/User/EnterCodePage'
import ParticipationsPage from '../pages/User/ParticipationsPage'
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage'
import AdminParticipantsPage from '../pages/Admin/AdminParticipantsPage'
import AdminUsersPage from '../pages/Admin/AdminUsersPage'
import AdminCodesPage from '../pages/Admin/AdminCodesPage'
import NotFoundPage from '../pages/Error/NotFoundPage'
import ProtectedRoute from '../components/common/ProtectedRoute'
import RulesPage from '../pages/Rules/RulesPage'
import ShopPage from '../pages/Shop/ShopPage'
import ContactPage from '../pages/Contact/ContactPage'
import AdminLayout from '../components/layout/AdminLayout'
import { trackPageView } from '../lib/analytics'
import SiteMapPage from '../pages/SiteMapPage'

const AppRouter = () => {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/plan-du-site" element={<SiteMapPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enter-code"
          element={
            <ProtectedRoute>
              <EnterCodePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/participations"
          element={
            <ProtectedRoute>
              <ParticipationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="participants" element={<AdminParticipantsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="codes" element={<AdminCodesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  )
}

export default AppRouter

