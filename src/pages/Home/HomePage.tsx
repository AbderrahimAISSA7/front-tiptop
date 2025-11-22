import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { subscribeNewsletter } from '../../api/newsletterApi'
import { useAuth } from '../../context/AuthContext'

const prizes = [
  {
    title: 'Infuseur à thé',
    description: "L'accessoire parfait pour savourer nos mélanges bio.",
    image: '/images/prize-infuser.svg',
  },
  {
    title: 'Coffret découverte',
    description: "3 produits exclusifs pour prolonger l'expérience.",
    image: '/images/prize-box.svg',
  },
  {
    title: 'Abonnement 1 an',
    description: 'Recevez chaque mois une surprise TheTipTop.',
    image: '/images/prize-subscription.svg',
  },
]

const steps = [
  { title: 'Quand se termine le jeu ?', content: 'Le tirage aura lieu dans 30 jours. Retourne souvent tenter ta chance !' },
  { title: 'Créer un compte ?', content: 'Inscris-toi en quelques clics pour suivre tes participations et tes lots.' },
  { title: 'Comment vérifier mon ticket ?', content: "Saisis ton code dans l'espace \"Entrer un code\" pour révéler ton gain." },
]

const HomePage = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [openIndex, setOpenIndex] = useState(0)
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleNewsletter = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await subscribeNewsletter(email)
      setStatus("Merci ! Nous t'avons ajouté à la newsletter.")
      setEmail('')
    } catch (error) {
      setStatus("Impossible d'ajouter cet email pour le moment.")
    }
  }

  const handlePlay = () => {
    navigate(user ? '/dashboard' : '/register')
  }

  return (
    <div className="home">
      <section className="hero glass-card">
        <div className="hero-text">
          <p className="eyebrow">Jeu-Concours</p>
          <h1>Des lots à gagner</h1>
          <p className="subtitle">
            Participe à l'ouverture de notre nouvelle boutique en jouant et en découvrant nos produits bio.
          </p>
          <Button onClick={handlePlay}>Jouer</Button>
          <span className="hero-deadline">Fin du jeu dans 30 jours</span>
        </div>
        <div className="hero-visual">
          <img src="/images/hero-leaf.png" alt="feuilles décoratives" />
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Lots à gagner</h2>
        <div className="prize-grid">
          {prizes.map((prize) => (
            <div className="prize-card glass-card" key={prize.title}>
              <img src={prize.image} alt={prize.title} />
              <h3>{prize.title}</h3>
              <p>{prize.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section glass-card faq">
        <h2 className="section-title">Comment participer</h2>
        <div className="accordion">
          {steps.map((step, index) => (
            <div className="accordion-item" key={step.title}>
              <button className="accordion-trigger" onClick={() => setOpenIndex(index)}>
                {step.title}
                <span>{openIndex === index ? '-' : '+'}</span>
              </button>
              {openIndex === index && <p>{step.content}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="section newsletter glass-card">
        <div>
          <h2 className="section-title">Recevoir nos surprises</h2>
          <p className="muted">Inscris ton email pour obtenir des indices exclusifs et des bonus.</p>
        </div>
        <form onSubmit={handleNewsletter} className="newsletter-form">
          <Input
            type="email"
            placeholder="ton.email@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Button type="submit">S'inscrire</Button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </section>
    </div>
  )
}

export default HomePage
