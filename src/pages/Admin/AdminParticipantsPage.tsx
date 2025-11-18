import { useEffect, useState } from 'react'
import { fetchParticipants } from '../../api/adminApi'
import type { ParticipantSummary } from '../../types/admin'

const AdminParticipantsPage = () => {
  const [participants, setParticipants] = useState<ParticipantSummary[]>([])

  useEffect(() => {
    fetchParticipants().then((res) => setParticipants(res.content)).catch(() => setParticipants([]))
  }, [])

  return (
    <div className="glass-card">
      <h1 className="page-title">Participants</h1>
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
