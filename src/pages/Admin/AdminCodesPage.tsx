import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  createCode,
  fetchAdminCodes,
  fetchPrizes,
  updateCodeStatus,
} from '../../api/adminApi'
import type { AdminCode, PrizeSummary } from '../../types/admin'
import Button from '../../components/common/Button'

const statusOptions = ['NEW', 'USED', 'CLAIMED']

const AdminCodesPage = () => {
  const [codes, setCodes] = useState<AdminCode[]>([])
  const [prizes, setPrizes] = useState<PrizeSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    code: '',
    prizeId: '',
    expirationDate: '',
  })

  const loadData = async () => {
    setLoading(true)
    try {
      const [codesResponse, prizesResponse] = await Promise.all([fetchAdminCodes(), fetchPrizes()])
      setCodes(codesResponse)
      setPrizes(prizesResponse)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault()
    if (!form.prizeId) {
      setMessage('Sélectionne un lot pour créer un code.')
      return
    }
    setCreating(true)
    setMessage('')
    try {
      await createCode({
        code: form.code.trim(),
        prizeId: Number(form.prizeId),
        expirationDate: form.expirationDate ? new Date(form.expirationDate).toISOString() : undefined,
      })
      setForm({ code: '', prizeId: '', expirationDate: '' })
      setMessage('Code créé avec succès.')
      await loadData()
    } catch (error) {
      setMessage("Impossible de créer le code.")
    } finally {
      setCreating(false)
    }
  }

  const handleStatusChange = async (codeId: number, status: string) => {
    try {
      await updateCodeStatus(codeId, status)
      setCodes((prev) => prev.map((code) => (code.id === codeId ? { ...code, status } : code)))
    } catch (error) {
      setMessage('Erreur lors de la mise à jour du statut.')
    }
  }

  const formatDate = (value?: string) => {
    if (!value) return '—'
    return new Date(value).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })
  }

  return (
    <div className="admin-codes-page">
      <div className="glass-card admin-section">
        <h1 className="page-title">Créer un code</h1>
        <form className="code-form" onSubmit={handleCreate}>
          <label className="tt-input-group">
            <span className="tt-input-label">Code</span>
            <input value={form.code} onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))} required />
          </label>
          <label className="tt-input-group">
            <span className="tt-input-label">Lot</span>
            <select value={form.prizeId} onChange={(e) => setForm((prev) => ({ ...prev, prizeId: e.target.value }))} required>
              <option value="">Sélectionner</option>
              {prizes.map((prize) => (
                <option key={prize.id} value={prize.id}>
                  {prize.name}
                </option>
              ))}
            </select>
          </label>
          <label className="tt-input-group">
            <span className="tt-input-label">Expiration (optionnel)</span>
            <input
              type="datetime-local"
              value={form.expirationDate}
              onChange={(e) => setForm((prev) => ({ ...prev, expirationDate: e.target.value }))}
            />
          </label>
          <Button type="submit" disabled={creating}>
            {creating ? 'Création...' : 'Générer'}
          </Button>
        </form>
        {message && <p className="status-message">{message}</p>}
      </div>

      <div className="glass-card admin-section">
        <h2 className="section-title">Codes existants</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Lot</th>
                  <th>Statut</th>
                  <th>Expiration</th>
                  <th>Créé le</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((code) => (
                  <tr key={code.id}>
                    <td>{code.code}</td>
                    <td>{code.prize?.name ?? '—'}</td>
                    <td>
                      <select value={code.status} onChange={(e) => handleStatusChange(code.id, e.target.value)}>
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{formatDate(code.expirationDate)}</td>
                    <td>{formatDate(code.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminCodesPage
