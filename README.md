# TipTop Frontend

Interface utilisateur de TipTop, développée avec **React 18 + TypeScript + Vite**. Elle consomme l’API Spring Boot (`tiptop-api`) via l’endpoint configuré dans la variable `VITE_API_BASE_URL`.

## Prérequis

- Node.js 20+
- npm 10+

## Installation & scripts

```bash
npm install          # installe les dépendances
npm run dev          # démarre Vite sur http://localhost:5173
npm run lint         # vérifie la qualité du code
npm test             # exécute les tests React Testing Library
npm run build        # build production (dossier dist/)
npm run preview      # prévisualise le build
```

## Variables d’environnement

- `VITE_API_BASE_URL` : URL de l’API TipTop (dev par défaut `http://localhost:8080`).  
  Définir dans `.env`, `.env.local` ou via `--build-arg` lors des builds Docker.

Exemple `.env.development` :
```
VITE_API_BASE_URL=http://localhost:8080
```

## Docker

Une image multi-étapes est fournie (`Dockerfile`) :

```bash
docker build -t tiptop-front \
  --build-arg VITE_API_BASE_URL=https://api.dev.tiptop.local \
  .

docker run -p 3000:80 tiptop-front
```

Le `docker-compose.yml` local attend la variable `APP_PORT` (port exposé) et transmet `VITE_API_BASE_URL`.

## Structure notable

- `src/components/` : layout, UI partagée (Header, AdminLayout…)
- `src/pages/` : pages (Home, Shop, Contact, Auth/Register, Admin, User…)
- `src/lib/analytics.ts` : intégrations analytiques
- `public/` : assets statiques

## CI/CD

Les pipelines Jenkins (dans le dépôt workflow `references/Jenkinsfile-frontend`) exécutent :
1. `npm ci`
2. `npm run lint && npm test`
3. `npm run build`
4. `docker build / push` vers le registry workflow
5. Déploiement via `scripts/deploy.sh` (dépôt workflow)

## Contribuer

1. Créer une branche `feature/<nom>`.
2. Mettre à jour/ajouter tests si nécessaire.
3. Vérifier `npm run lint` et `npm test`.
4. Soumettre une PR dans Gitea (ou Git provider utilisé).
