import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import { fetchMyParticipations } from "../../api/participationApi";
import { useAuth } from "../../context/AuthContext";
import type { Participation } from "../../types/participation";

const DashboardPage = () => {
  const { user, deleteAccount } = useAuth();
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchMyParticipations().then(setParticipations).catch(() => setParticipations([]));
  }, []);

  const handleDelete = () => setShowConfirm(true);
  const confirmDelete = () => {
    void deleteAccount();
    setShowConfirm(false);
  };
  const cancelDelete = () => setShowConfirm(false);

  return (
    <div className="dashboard-shell">
      <div className="glass-card dashboard">
        <h1 className="page-title">Bienvenue, {user?.firstName}</h1>
        <p className="muted">Tu as déjà participé {participations.length} fois.</p>
        <div className="dashboard-actions">
          <Link to="/enter-code">
            <Button>Entrer un code</Button>
          </Link>
          <Link to="/participations">
            <Button variant="ghost">Mes participations</Button>
          </Link>
        </div>
        {participations.length > 0 && (
          <div className="section">
            <h2 className="section-title">Dernières participations</h2>
            <ul className="participation-list">
              {participations.slice(0, 3).map((participation) => (
                <li key={participation.id}>
                  <span>{participation.code.code}</span>
                  <span>{participation.prize?.name ?? "Tirage en cours"}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="glass-card profile-card">
        <h2 className="section-title">Mon profil</h2>
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

      {showConfirm && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Confirmer la suppression</h3>
            <p>Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.</p>
            <div className="modal-actions">
              <button className="tt-btn tt-btn-ghost" onClick={cancelDelete}>
                Annuler
              </button>
              <button className="danger-btn" onClick={confirmDelete}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;