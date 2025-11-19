import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/rules', label: 'Réglement' },
  { to: '/shop', label: 'Boutique' },
  { to: '/contact', label: 'Contact' },
]

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isAdmin = user?.role === 'ADMIN'

  return (
    <header className="tt-header">
      <Link className="tt-logo" to="/">
        <img src="/images/logo-tiptop.png" alt="TipTop" />
        <span>TheTipTop</span>
      </Link>
      <nav className="tt-nav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="tt-header-actions">
        {user ? (
          <>
            <div className="tt-user-chip">
              <span onClick={() => navigate('/dashboard')}>
                Bonjour, {user.firstName} {user.lastName}
              </span>
            </div>
            {isAdmin && (
                  <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
                    Back office
                  </Button>
                )}
            <Button onClick={handleLogout} variant="ghost">
              Déconnexion
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Connexion
            </Button>
            <Button onClick={() => navigate('/register')}>Inscription</Button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
