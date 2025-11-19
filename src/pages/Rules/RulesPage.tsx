const sections = [
  {
    title: '1. Objet du jeu',
    content:
      "Le jeu-concours TheTipTop vise à célébrer l'ouverture de notre boutique et à promouvoir nos produits naturels. Chaque participation correspond à la validation d'un code unique distribué lors de nos opérations marketing.",
  },
  {
    title: '2. Conditions de participation',
    content:
      "Le jeu est ouvert à toute personne majeure résidant en France métropolitaine, une seule participation par code. La création d'un compte est obligatoire pour suivre les gains et recevoir les notifications.",
  },
  {
    title: '3. Durée',
    content:
      "Le jeu est disponible pendant 30 jours à compter de son lancement. Passé ce délai, les codes expirés ne peuvent plus être utilisés et aucun lot supplémentaire ne sera attribué.",
  },
  {
    title: '4. Lots',
    content:
      "Les lots mis en jeu sont décrits sur la page d’accueil (infuseur à thé, coffret découverte, abonnement 1 an). Ils sont non échangeables et non remboursables. En cas d'indisponibilité, un lot d'une valeur équivalente sera proposé.",
  },
  {
    title: '5. Attribution des gains',
    content:
      "Après validation d'un code, le lot apparaît instantanément dans votre espace participations. Chaque lot est soumis à vérification avant expédition. Un email de confirmation vous sera envoyé.",
  },
  {
    title: '6. Responsabilité',
    content:
      "TheTipTop se réserve le droit de suspendre le jeu en cas de fraude, de problème technique ou de force majeure. La participation implique l'acceptation sans réserve du présent règlement.",
  },
]

const RulesPage = () => {
  return (
    <div className="rules-page glass-card">
      <div className="rules-hero">
        <div>
          <p className="eyebrow">Règlement officiel</p>
          <h1>Jouer en toute transparence</h1>
          <p className="muted">
            Retrouvez ci-dessous les conditions complètes du jeu-concours TheTipTop. Nous restons disponibles pour toute question
            complémentaire.
          </p>
        </div>
        <img src="/images/rules-hero.svg" alt="illustration règlement" />
      </div>

      <div className="rules-list">
        {sections.map((section) => (
          <article key={section.title} className="rules-section">
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default RulesPage
