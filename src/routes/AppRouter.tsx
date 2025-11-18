import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import HomePage from '../pages/Home/HomePage'
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import DashboardPage from '../pages/User/DashboardPage'
import EnterCodePage from '../pages/User/EnterCodePage'
import ParticipationsPage from '../pages/User/ParticipationsPage'
import ProfilePage from '../pages/User/ProfilePage'
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage'
import AdminParticipantsPage from '../pages/Admin/AdminParticipantsPage'
import NotFoundPage from '../pages/Error/NotFoundPage'
import ProtectedRoute from '../components/common/ProtectedRoute'

const AppRouter = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/participants"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminParticipantsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  )
}

export default AppRouter
