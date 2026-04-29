---
name: notion-new-subject
description: Crée un nouveau sujet dans le backlog Notion
arguments:
  - name: nom
    description: Nom du nouveau sujet (optionnel)
    required: false
---

# Création de sujet Notion

Ce skill permet d'ajouter rapidement une idée de sujet de blog dans le backlog Notion.

## Fonctionnement

Le skill utilise les outils MCP Notion suivants :
- `notion-create-pages` pour créer le nouveau sujet dans la database

## Workflow interactif

1. Collecte le nom du sujet
2. Propose de saisir une description (optionnel)
3. Propose de choisir une section parmi les options disponibles
4. Propose de lier des formations (optionnel, nécessite de connaître les IDs)
5. Crée le sujet dans Notion
6. Affiche l'URL du sujet créé
