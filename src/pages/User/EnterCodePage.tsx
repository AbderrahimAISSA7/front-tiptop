import { useState } from 'react'
import type { FormEvent } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { submitCode } from '../../api/participationApi'

const EnterCodePage = () => {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    try {
      const participation = await submitCode({ code })
      setMessage(`Félicitations ! Lot: ${participation.prize?.name ?? 'à découvrir bientôt'}`)
      setCode('')
    } catch (err: any) {
      setError(err?.response?.data?.message ?? ' Code invalide. ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card">
      <h1 className="page-title">Entrer un code</h1>
      <p className="muted">Saisis le code unique présent sur ton ticket pour tenter ta chance.</p>
      <form onSubmit={handleSubmit} className="enter-code-form">
        <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="ABC123DEF4" required />
        <Button type="submit" disabled={loading}>
          {loading ? 'Validation...' : 'Valider mon code'}
        </Button>
      </form>
      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}

export default EnterCodePage
