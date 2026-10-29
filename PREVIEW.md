# Prévisualisation technique FR/EN

Cette branche prépare l'environnement de travail. La refonte éditoriale n'est pas encore intégrée.

- Sanity utilise un dataset de travail privé distinct. La configuration refuse le dataset production.
- SANITY_API_READ_TOKEN est réservé au serveur. Ne jamais utiliser un préfixe NEXT_PUBLIC_ pour ce secret.
- Les lectures utilisent la perspective published. Les brouillons sont exclus.
- Les emails sont désactivés en preview et en local.
- Les variables Vercel de travail doivent cibler preview et cette branche uniquement.
- Aucun déploiement production, aucune promotion ni fusion dans main ne font partie de cette mission.

Contrôles locaux réussis : build Next.js complet, cinq tests de protection et contrôle SEO bilingue portant sur 54 pages du sitemap.

Les documents de passation, archives Sanity, secrets et journaux détaillés restent hors de cette publication publique.

Une fois la preview prête, consulter son URL et son état dans le tableau des déploiements Vercel du projet.
