import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/rules', label: 'Règlement' },
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

  return (
    <header className="tt-header">
      <Link className="tt-logo" to="/">
        <img src="/images/logo.svg" alt="TipTop" />
        <span>TipTop</span>
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
            <span className="tt-user-chip">
              Bonjour, {user.firstName} {user.lastName}
            </span>
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
