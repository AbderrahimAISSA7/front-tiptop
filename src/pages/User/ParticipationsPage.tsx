import { useEffect, useState } from 'react'
import { fetchMyParticipations } from '../../api/participationApi'
import type { Participation } from '../../types/participation'

const ParticipationsPage = () => {
  const [participations, setParticipations] = useState<Participation[]>([])

  useEffect(() => {
    fetchMyParticipations().then(setParticipations)
  }, [])

  return (
    <div className="glass-card">
      <h1 className="page-title">Mes participations</h1>
      <ul className="participation-list detail">
        {participations.map((participation) => (
          <li key={participation.id}>
            <div>
              <strong>Code</strong>
              <span>{participation.code.code}</span>
            </div>
            <div>
              <strong>Lot</strong>
              <span>{participation.prize?.name ?? 'En attente'}</span>
            </div>
          </li>
        ))}
      </ul>
      {participations.length === 0 && <p className="muted">Aucune participation pour le moment.</p>}
    </div>
  )
}

export default ParticipationsPage
