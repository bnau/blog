---
name: notion-sync-status
description: Synchronise le statut d'un article vers Notion
arguments:
  - name: slug
    description: Slug de l'article (optionnel, sinon liste affichée)
    required: false
  - name: options
    description: Options --dry-run ou --force
    required: false
---

# Synchronisation de statut vers Notion

Ce skill marque un sujet Notion comme publié quand l'article de blog est terminé.

## Fonctionnement

Le skill utilise les outils MCP Notion suivants :
- `notion-search` pour rechercher le sujet par titre
- `notion-query_data_sources` pour interroger la database
- `notion-update-page` pour mettre à jour le statut du sujet

## Algorithme de matching

### Matching exact
1. Normalise le titre de l'article (lowercase, trim)
2. Query Notion avec filtre : `Nom = titre` (case-insensitive)
3. Si 1 résultat : match trouvé

### Matching fuzzy (si pas de match exact)
1. Récupère tous les sujets Notion
2. Calcule la distance de Levenshtein entre le titre et chaque nom de sujet
3. Propose les 3 sujets les plus similaires (distance < 5)
4. Demande confirmation à l'utilisateur

## Propriétés Notion à mettre à jour

- **Statut** : Si une propriété "Statut" existe, la définir à "Publié"
- **Date de publication** : Si une propriété "Date de publication" existe, utiliser `pubDate` du post
- **URL article** : Si une propriété "URL article" ou "Lien" existe, ajouter l'URL du blog

Note : Ces propriétés doivent être ajoutées manuellement à la database Notion si souhaitées.
