const SiteMapPage = () => {
  return (
    <div className="glass-card sitemap-card">
      <h1 className="page-title">Plan du site</h1>
      <p className="muted">Navigation synthétique des pages clés et de l’espace connecté.</p>

      <div className="sitemap-grid">
        <div className="sitemap-node root">
          <a href="/">Accueil</a>
        </div>
        <div className="sitemap-node public">
          <a href="/login">Connexion</a>
          <a href="/register">Inscription</a>
        </div>
        <div className="sitemap-node public">
          <a href="/rules">Règlement</a>
          <a href="/shop">Boutique</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="sitemap-node private">
          <a href="/dashboard">Dashboard</a>
          <a href="/participations">Mes participations</a>
          <a href="/enter-code">Entrer un code</a>
          <a href="/admin/dashboard">Admin (si autorisé)</a>
        </div>
      </div>

      <div className="sitemap-legend">
        <span className="dot public" /> Pages publiques
        <span className="dot private" /> Espace connecté
      </div>
    </div>
  );
};

export default SiteMapPage;
