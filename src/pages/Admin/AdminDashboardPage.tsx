import { useEffect, useMemo, useState } from 'react'
import { fetchAdminStats, fetchParticipants } from '../../api/adminApi'
import type { AdminStats, ParticipantSummary } from '../../types/admin'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts'

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [participants, setParticipants] = useState<ParticipantSummary[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const [statsResponse, participantsResponse] = await Promise.all([fetchAdminStats(), fetchParticipants()])
        setStats(statsResponse)
        setParticipants(participantsResponse.content)
      } catch (error) {
        setStats(null)
        setParticipants([])
      }
    }
    load()
  }, [])

  const chartData = useMemo(() => {
    if (!stats) {
      return null
    }
    const availableCodes = Math.max(stats.totalCodes - stats.usedCodes, 0)
    const usage = [
      { name: 'Codes utilises', value: stats.usedCodes },
      { name: 'Codes disponibles', value: availableCodes },
    ]
    const distribution = stats.prizeDistribution.map((item) => ({
      name: item.prizeName,
      value: item.count,
    }))
    return { usage, distribution }
  }, [stats])

  const timelineData = useMemo(() => {
    if (!participants.length) {
      return []
    }
    const days: { label: string; key: string }[] = []
    const formatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: '2-digit' })
    for (let i = 6; i >= 0; i -= 1) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const key = date.toISOString().slice(0, 10)
      days.push({ label: formatter.format(date), key })
    }
    const counts: Record<string, { participations: number; winners: number }> = {}
    participants.forEach((item) => {
      if (!item.createdAt) return
      const key = item.createdAt.slice(0, 10)
      if (!counts[key]) counts[key] = { participations: 0, winners: 0 }
      counts[key].participations += 1
      if (item.prize?.name) counts[key].winners += 1
    })
    return days.map((day) => ({
      day: day.label,
      participations: counts[day.key]?.participations ?? 0,
      winners: counts[day.key]?.winners ?? 0,
    }))
  }, [participants])

  const topParticipants = useMemo(() => {
    if (!participants.length) {
      return []
    }
    const map: Record<string, number> = {}
    participants.forEach((item) => {
      const label = `${item.user.firstName} ${item.user.lastName}`
      map[label] = (map[label] ?? 0) + 1
    })
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ subject: name, value }))
  }, [participants])

  if (!stats) {
    return (
      <div className="glass-card">
        <h1 className="page-title">Statistiques</h1>
        <p>Chargement des donnees...</p>
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
          <span>Codes utilises : </span>
          <strong>{stats.usedCodes}</strong>
        </div>
        <div className="stat-card">
          <span>Participations en cours : </span>
          <strong>{Math.max(stats.totalCodes - stats.usedCodes, 0)}</strong>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Utilisation des codes</h3>
          {chartData && (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={chartData.usage}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {chartData.usage.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={index === 0 ? '#3a7851' : '#a5c3ae'}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} codes`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="chart-card">
          <h3>Repartition par lots</h3>
          {chartData && chartData.distribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData.distribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value: number) => `${value} gains`} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#5fa773" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="muted">Aucune distribution disponible.</p>
          )}
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Flux de participations (7 derniers jours)</h3>
          {timelineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="participations" name="Participations" stroke="#3a7851" fill="#a5c3ae" />
                <Area type="monotone" dataKey="winners" name="Gagnants" stroke="#f4c95d" fill="#f7dfa0" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="muted">Pas assez de participations pour tracer une tendance.</p>
          )}
        </div>

        <div className="chart-card">
          <h3>Top participants</h3>
          {topParticipants.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={topParticipants}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar dataKey="value" stroke="#5fa773" fill="#5fa773" fillOpacity={0.6} />
                <Tooltip formatter={(value: number) => `${value} participations`} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <p className="muted">Aucun participant actif detecte.</p>
          )}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Details par lot</h2>
        {stats.prizeDistribution.length > 0 ? (
          <ul className="distribution-list">
            {stats.prizeDistribution.map((item) => (
              <li key={item.prizeName}>
                <span>{item.prizeName} :</span>
                <strong>{item.count}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">Pas encore de gain attribue.</p>
        )}
      </div>
    </div>
  )
}

export default AdminDashboardPage
