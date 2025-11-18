const Footer = () => {
  return (
    <footer className="tt-footer">
      <p>© {new Date().getFullYear()} TheTipTop. Tous droits réservés.</p>
      <div className="tt-footer-links">
        <a href="#reglement">Règlement</a>
        <a href="#contact">Contact</a>
        <a href="#privacy">Politique de confidentialité</a>
      </div>
    </footer>
  )
}

export default Footer
