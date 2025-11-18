import { useAuth } from '../../context/AuthContext'

const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <div className="glass-card">
      <h1 className="page-title">Mon profil</h1>
      {user ? (
        <ul className="profile-list">
          <li>
            <span>Prénom</span>
            <span>{user.firstName}</span>
          </li>
          <li>
            <span>Nom</span>
            <span>{user.lastName}</span>
          </li>
          <li>
            <span>Email</span>
            <span>{user.email}</span>
          </li>
          <li>
            <span>Rôle</span>
            <span>{user.role}</span>
          </li>
        </ul>
      ) : (
        <p>Utilisateur non connecté.</p>
      )}
    </div>
  )
}

export default ProfilePage
