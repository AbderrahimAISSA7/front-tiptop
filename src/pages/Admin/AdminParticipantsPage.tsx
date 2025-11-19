import { useEffect, useMemo, useState } from 'react'
import { fetchParticipants } from '../../api/adminApi'
import type { ParticipantSummary } from '../../types/admin'
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
} from 'recharts'

const colors = ['#3a7851', '#5fa773', '#a5c3ae', '#f4c95d', '#f28f6b']

const AdminParticipantsPage = () => {
  const [participants, setParticipants] = useState<ParticipantSummary[]>([])
  const [totalElements, setTotalElements] = useState(0)

  useEffect(() => {
    fetchParticipants()
      .then((res) => {
        setParticipants(res.content)
        setTotalElements(res.totalElements)
      })
      .catch(() => {
        setParticipants([])
        setTotalElements(0)
      })
  }, [])

  const summaries = useMemo(() => {
    const total = totalElements || participants.length
    let winners = 0
    const prizeCounts: Record<string, number> = {}
    const participantCounts: Record<string, number> = {}

    participants.forEach((item) => {
      const prizeName = item.prize?.name ?? 'En attente'
      prizeCounts[prizeName] = (prizeCounts[prizeName] ?? 0) + 1
      const userName = `${item.user.firstName} ${item.user.lastName}`
      participantCounts[userName] = (participantCounts[userName] ?? 0) + 1
      if (item.prize?.name) {
        winners += 1
      }
    })

    const awaiting = Math.max(total - winners, 0)
    const prizeChart = Object.entries(prizeCounts).map(([name, value]) => ({ name, value }))
    const topParticipants = Object.entries(participantCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }))

    return { total, winners, awaiting, prizeChart, topParticipants }
  }, [participants, totalElements])

  return (
    <div className="glass-card">
      <h1 className="page-title">Participants</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total participants : </span>
          <strong>{summaries.total}</strong>
        </div>
        <div className="stat-card">
          <span>Gagnants : </span>
          <strong>{summaries.winners}</strong>
        </div>
        <div className="stat-card">
          <span>En attente : </span>
          <strong>{summaries.awaiting}</strong>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Repartition des lots</h3>
          {summaries.prizeChart.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={summaries.prizeChart} dataKey="value" nameKey="name" outerRadius={90} label>
                  {summaries.prizeChart.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} participants`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="muted">Pas encore de participations.</p>
          )}
        </div>
        <div className="chart-card">
          <h3>Participants les plus actifs</h3>
          {summaries.topParticipants.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={summaries.topParticipants} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip formatter={(value: number) => `${value} codes`} />
                <Bar dataKey="value" fill="#3a7851" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="muted">Aucune donnee suffisante.</p>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Code</th>
              <th>Lot</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.user.firstName} {item.user.lastName}
                </td>
                <td>{item.user.email}</td>
                <td>{item.code.code}</td>
                <td>{item.prize?.name ?? 'En attente'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminParticipantsPage
