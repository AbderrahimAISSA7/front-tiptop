# Furious Ducks Workflow

Ce dépôt décrit et automatise l’infrastructure exigée par le sujet **Furious Ducks** : SCM Git, CI/CD Jenkins, registry privé, monitoring, sauvegardes, reverse proxy et environnements applicatifs TipTop (Dev / Préprod / Prod). Les dépôts applicatifs (`tiptop-front`, `tiptop-api`) restent séparés.

## Objectifs

- Industrialiser la chaîne Gitflow → Jenkins → Docker registry → environnements multi-stacks.
- Exposer chaque brique via un sous-domaine sécurisé (Traefik + Let’s Encrypt).
- Collecter des métriques (Prometheus, Grafana) et automatiser les sauvegardes (Restic).
- Produire la documentation demandée (architecture, processus de déploiement/sauvegarde).

## Arborescence

```
.
├── docs/                # Documentation technique & processus
├── infra/               # Services du workflow (Traefik, Jenkins, Gitea, registry, monitoring, backups)
├── app-envs/            # Docker Compose des environnements TipTop (dev / préprod / prod)
├── scripts/             # Scripts utilitaires (deploy.sh appelé par Jenkins)
├── examples/            # Jenkinsfile de référence front/back
└── README.md
```

## Mise en route rapide

1. Préparer deux domaines (site + workflow) avec les enregistrements DNS listés dans `docs/architecture.md`.
2. Installer Docker Engine + Docker Compose plugin sur un ou plusieurs VPS Debian 12.
3. Cloner ce dépôt (ex. `/opt/workflow/furious-ducks-workflow`) et créer les réseaux Docker :
   ```bash
   docker network create workflow_net
   docker network create app_dev_net
   docker network create app_preprod_net
   docker network create app_prod_net
   ```
4. Pour chaque dossier `infra/*`, copier le `.env.example` en `.env`, ajuster les valeurs puis lancer `docker compose up -d`.
5. Importer `tiptop-front` et `tiptop-api` dans Gitea, créer les pipelines Jenkins (en partant des `examples/`).
6. Jenkins pousse les images dans le registry privé puis exécute `scripts/deploy.sh <env> <module>` pour mettre à jour `app-envs`.

## Documentation

- `docs/architecture.md` — vue d’ensemble des serveurs, réseaux Docker et DNS.
- `docs/processus-deploiement.md` — pipeline Gitflow complet avec promotions Dev/Préprod/Prod.
- `docs/processus-sauvegarde.md` — stratégie Restic + procédures de restauration.

## Conformité aux exigences Furious Ducks

- ✅ Workflow hébergé sur serveur(s) Linux, full Docker.
- ✅ Jenkins + SCM Git (Gitea) + registry privé + monitoring (Prometheus/Grafana) + backups automatiques.
- ✅ Gitflow + environnements Dev/Préprod/Prod + domaines dédiés.
- ✅ Documentation opérationnelle prête pour la soutenance.

Adapte les noms de domaine, adresses IP, secrets et tailles de machines selon ton contexte d’hébergement.
