import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user, deleteAccount } = useAuth();

  const handleDelete = () => {
    if (confirm("Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.")) {
      void deleteAccount();
    }
  };

  return (
    <div className="glass-card">
      <h1 className="page-title">Mon profil</h1>
      {user ? (
        <>
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
          <div className="profile-actions">
            <button className="danger-btn" onClick={handleDelete}>
              Supprimer mon compte
            </button>
          </div>
        </>
      ) : (
        <p>Utilisateur non connecté.</p>
      )}
    </div>
  );
};

export default ProfilePage;