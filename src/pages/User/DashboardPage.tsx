import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { fetchMyParticipations } from '../../api/participationApi'
import type { Participation } from '../../types/participation'
import Button from '../../components/common/Button'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
  const { user } = useAuth()
  const [participations, setParticipations] = useState<Participation[]>([])

  useEffect(() => {
    fetchMyParticipations().then(setParticipations).catch(() => setParticipations([]))
  }, [])

  return (
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
                <span>{participation.prize?.name ?? 'Tirage en cours'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
