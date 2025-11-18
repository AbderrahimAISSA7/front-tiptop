import { useState } from 'react'
import type { FormEvent } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setError('Identifiants invalides.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page glass-card">
      <div className="auth-tabs">
        <button className="active">Connexion</button>
        <Link to="/register">Inscription</Link>
      </div>
      <h1>Connexion</h1>
      <p className="muted">Connecte-toi pour enregistrer tes participations.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Connexion'}
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
