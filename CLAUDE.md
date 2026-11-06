# Consignes pour les sessions Claude — projets Hnaya

Plusieurs sessions Claude travaillent en parallèle sur les produits Hnaya et partagent des
ressources que git ne voit pas : projet Supabase, VPS Icosnet, DNS, comptes SMTP et SMS.

**Avant de toucher à l'une de ces ressources** — Supabase, VPS, Caddy, DNS, authentification,
SMTP ou SMS, fournisseur tiers — lis `RESSOURCES-PARTAGEES.md` :
https://github.com/hnaya-dz/hnaya-docs/blob/main/RESSOURCES-PARTAGEES.md
Si tu ne peux pas le lire, dis-le à Nacib avant d'agir.

## Ce que tu fais

1. **T'identifier.** Utilise ton nom de session tel qu'il figure au registre « Qui est qui ».
   Chaque commit se termine par la ligne `Claude-Session: …`.
2. **Rester dans ton périmètre.** Ne corrige pas ce qu'une autre session a posé : signale-le à Nacib.
3. **Annoncer** avant un changement irréversible ou qui touche une ressource partagée
   (« Chantiers en cours » du fichier ci-dessus).
4. **Consigner après**, au journal : ton nom de session, la **date et l'heure (UTC)**, ce qui a
   changé, l'effet à connaître. Si le changement touche l'**architecture** (port, domaine, DNS,
   schéma ou droits de la base partagée, authentification, fournisseur, Caddy), ajoute aussi un ADR
   dans `ARCHITECTURE_DECISION_RECORDS.md` et cite-le dans la ligne du journal.
5. **Vérifier après coup** que le changement a l'effet visé, pas seulement que la commande a réussi.
6. **Aucun secret** : ni dans git, ni dans ces fichiers, ni dans une conversation.

Ce dépôt est l'API de recherche Hnaya (`hnaya-search-api`). Voir le registre « Qui est qui » pour savoir quelle session s'en occupe.


Ce fichier est une consigne de Nacib. Ne le modifie pas sans son accord.
