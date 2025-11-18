import Button from '../../components/common/Button'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="glass-card">
    <h1 className="page-title">Page introuvable</h1>
    <p className="muted">La page que tu recherches n’existe pas ou a été déplacée.</p>
    <Link to="/">
      <Button>Retour à l’accueil</Button>
    </Link>
  </div>
)

export default NotFoundPage
