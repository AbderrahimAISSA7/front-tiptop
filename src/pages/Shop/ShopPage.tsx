const products = [
  {
    title: 'Pack découverte',
    description: '3 infusions signatures + 1 accessoire offert.',
    price: '29€',
    image: '/images/shop-pack.svg',
  },
  {
    title: 'Box bien-être',
    description: 'Sélection mensuelle de produits naturels.',
    price: '39€/mois',
    image: '/images/shop-box.svg',
  },
  {
    title: 'Carte cadeau',
    description: 'Choisissez la valeur et faites plaisir autour de vous.',
    price: 'à partir de 25€',
    image: '/images/shop-gift.svg',
  },
]

const ShopPage = () => {
  return (
    <div className="shop-page glass-card">
      <div className="shop-hero">
        <div>
          <p className="eyebrow">Boutique</p>
          <h1>Découvrez nos meilleures ventes</h1>
          <p className="muted">
            Des produits naturels, une fabrication locale et des éditions limitées à découvrir en exclusivité dans notre boutique.
          </p>
          <br/>
          <a className="tt-btn tt-btn-primary" href="https://thetiptop.example.com" target="_blank" rel="noreferrer">
            Visiter la boutique
          </a>
        </div>
        <img src="/images/shop-hero.svg" alt="boutique TipTop" />
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card glass-card" key={product.title}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <strong>{product.price}</strong>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ShopPage
