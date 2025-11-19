import { NavLink, Outlet } from 'react-router-dom'
import Button from '../common/Button'
import { useAuth } from '../../context/AuthContext'

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/users', label: 'Utilisateurs' },
  { to: '/admin/codes', label: 'Codes' },
  { to: '/admin/participants', label: 'Participations' },
]

const AdminLayout = () => {
  const { logout } = useAuth()

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/images/logo-tiptop.png" alt="TipTop" />
          <div>
            <span className="title">Back Office</span>
            <p>Admin</p>
          </div>
        </div>
        <nav className="admin-nav">
          {adminLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Button variant="ghost" onClick={logout}>
          Déconnexion
        </Button>
      </aside>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
