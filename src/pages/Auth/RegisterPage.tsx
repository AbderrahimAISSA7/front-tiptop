import { useState } from 'react'
import type { FormEvent } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { trackEvent } from '../../lib/analytics'

const RegisterPage = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      trackEvent('generate_lead', {
        event_category: 'formulaire',
        event_label: 'inscription_jeu_concours',
        value: 1,
      })
      navigate('/dashboard')
    } catch (err) {
      setError("Impossible de créer le compte. Email déjà utilisé ?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page glass-card">
      <div className="auth-tabs">
        <Link to="/login">Connexion</Link>
        <button className="active">Inscription</button>
      </div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="grid-two">
          <Input label="Prénom" value={form.firstName} onChange={(e) => handleChange('firstName', e.target.value)} required />
          <Input label="Nom" value={form.lastName} onChange={(e) => handleChange('lastName', e.target.value)} required />
        </div>
        <Input label="Email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required />
        <Input
          label="Mot de passe"
          type="password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Création...' : 'Créer un compte'}
        </Button>
      </form>
    </div>
  )
}

export default RegisterPage
