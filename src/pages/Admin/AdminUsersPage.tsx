import { useEffect, useState } from 'react'
import { deleteUser, fetchAdminUsers, updateUserRole } from '../../api/adminApi'
import type { AdminUser } from '../../types/admin'
import Button from '../../components/common/Button'
import { trackEvent } from '../../lib/analytics'

const roles: AdminUser['role'][] = ['USER', 'ADMIN']

const AdminUsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [confirmUser, setConfirmUser] = useState<AdminUser | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

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
      setUsers((prev) => prev.map((user) => (user.id === userId ? updated : user)))
      setMessage('Role mis a jour.')
      trackEvent('admin_user_role_changed', { userId, role })
    } catch {
      setMessage('Impossible de mettre a jour le role.')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDeleteUser = async () => {
    if (!confirmUser) return
    setDeletingId(confirmUser.id)
    setMessage('')
    try {
      await deleteUser(confirmUser.id)
      setUsers((prev) => prev.filter((user) => user.id !== confirmUser.id))
      setMessage('Utilisateur supprime.')
      trackEvent('admin_user_deleted', { userId: confirmUser.id })
    } catch {
      setMessage("Impossible de supprimer l'utilisateur.")
    } finally {
      setDeletingId(null)
      setConfirmUser(null)
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
                <th>Role</th>
                <th>Actions</th>
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
                  <td>
                    <Button variant="danger" onClick={() => setConfirmUser(user)} disabled={deletingId === user.id}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="icon-inline"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {message && <p className="status-message">{message}</p>}

      {confirmUser && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Confirmer la suppression</h3>
            <p className="muted">
              Voulez-vous supprimer {confirmUser.firstName} {confirmUser.lastName} ?
            </p>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setConfirmUser(null)} disabled={deletingId !== null}>
                Annuler
              </Button>
              <Button onClick={handleDeleteUser} disabled={deletingId !== null}>
                {deletingId ? 'Suppression...' : 'Supprimer'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsersPage
