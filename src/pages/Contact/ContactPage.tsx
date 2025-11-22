import { useState } from "react"
import type { FormEvent } from "react"
import Input from "../../components/common/Input"
import Button from "../../components/common/Button"

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setStatus('Merci ! Nous revenons vers vous très vite.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="contact-page glass-card">
      <div className="contact-hero">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>On reste en contact</h1>
          <p className="muted">
            Une question sur le jeu, un partenariat ou simplement envie de nous saluer ? L’équipe TheTipTop te répond sous 24h ouvrées.
          </p>
          <ul className="contact-infos">
            <li>
              <strong>Email : </strong>
              <span>hello@thetiptop.fr</span>
            </li>
            <li>
              <strong>Téléphone : </strong>
              <span>+33 1 23 45 67 89</span>
            </li>
            <li>
              <strong>Adresse : </strong>
              <span>15 rue des Platanes, 06000 Nice</span>
            </li>
          </ul>
        </div>
        <img src="/images/contact-hero.svg" alt="contact tiptop" />
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <Input label="Nom complet" value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
        <Input label="Email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required />
        <label className="tt-input-group">
          <span className="tt-input-label">Message</span>
          <textarea
            className="tt-textarea"
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={4}
            required
          />
        </label>
        <Button type="submit">Envoyer</Button>
        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  )
}

export default ContactPage
