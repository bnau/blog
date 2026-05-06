---
name: notion-create-post
description: Crée un article de blog depuis un sujet Notion
arguments:
  - name: nom-du-sujet
    description: Nom du sujet Notion (optionnel, sinon liste affichée)
    required: false
---

# Création d'article depuis Notion

Ce skill crée un nouvel article de blog en utilisant les informations d'un sujet Notion.

## Fonctionnement

Le skill utilise les outils MCP Notion suivants :
- `notion-search` pour rechercher le sujet par nom
- `notion-fetch` pour récupérer les détails du sujet
- `notion-query_data_sources` pour lister les sujets disponibles

Il s'inspire du pattern de `/new-post` existant pour :
- Générer le slug du fichier
- Créer le frontmatter
- Structurer le contenu avec des sections de template

## Mapping des champs

| Notion | Blog Frontmatter |
|--------|------------------|
| Nom | title (exact) |
| Description | description |
| Section | keywords (array) |
| Formations | relatedCourses (si disponible) |
| Date actuelle | pubDate |
