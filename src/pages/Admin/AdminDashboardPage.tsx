import { useEffect, useState } from 'react'
import { fetchAdminStats } from '../../api/adminApi'
import type { AdminStats } from '../../types/admin'

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null)

  useEffect(() => {
    fetchAdminStats().then(setStats).catch(() => setStats(null))
  }, [])

  if (!stats) {
    return (
      <div className="glass-card">
        <h1 className="page-title">Statistiques</h1>
        <p>Chargement des données...</p>
      </div>
    )
  }

  return (
    <div className="glass-card admin-dashboard">
      <h1 className="page-title">Statistiques globales</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <span>Total codes : </span>
          <strong>{stats.totalCodes}</strong>
        </div>
        <div className="stat-card">
          <span>Codes utilisés : </span>
          <strong>{stats.usedCodes}</strong>
        </div>
        <div className="stat-card">
          <span>Participation en cours : </span>
          <strong>{stats.totalCodes - stats.usedCodes}</strong>
        </div>
      </div>
      <div className="section">
        <h2 className="section-title">Répartition par lots</h2>
        <ul className="distribution-list">
          {stats.prizeDistribution.map((item) => (
            <li key={item.prizeName}>
              <span>{item.prizeName} :</span>
              <strong>{item.count}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboardPage
