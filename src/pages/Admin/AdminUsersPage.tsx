import { useEffect, useState } from "react"
import { fetchAdminUsers, updateUserRole } from "../../api/adminApi"
import type { AdminUser } from "../../types/admin"

const roles: AdminUser['role'][] = ['USER', 'ADMIN']

const AdminUsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await fetchAdminUsers()
      setUsers(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleUpdateRole = async (userId: number, role: AdminUser['role']) => {
    setUpdatingId(userId)
    setMessage('')
    try {
      const updated = await updateUserRole(userId, role)
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)))
      setMessage('Rôle mis à jour.')
    } catch (error) {
      setMessage("Impossible de mettre à jour le rôle.")
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="glass-card admin-section">
      <div className="admin-section-header">
        <div>
          <p className="eyebrow">Gestion</p>
          <h1>Comptes utilisateurs</h1>
          <p className="muted">Promouvoir un utilisateur admin ou le repasser sur un profil joueur.</p>
        </div>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleUpdateRole(user.id, e.target.value as AdminUser['role'])}
                      disabled={updatingId === user.id}
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {message && <p className="status-message">{message}</p>}
    </div>
  )
}

export default AdminUsersPage
