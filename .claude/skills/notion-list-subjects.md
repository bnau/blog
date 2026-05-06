---
name: notion-list-subjects
description: Liste les sujets du backlog Notion pour créer des articles de blog
arguments:
  - name: options
    description: Options de filtrage (--section, --formation, --available, --all)
    required: false
---

# Liste des sujets Notion

Ce skill interroge la database Notion des sujets et affiche les sujets disponibles pour la création d'articles de blog.

## Fonctionnement

Le skill utilise les outils MCP Notion suivants :
- `notion-search` ou `notion-query_data_sources` pour récupérer les sujets
- Lecture du système de fichiers pour scanner les articles existants
- Algorithme de matching pour déterminer si un article existe pour chaque sujet

## Implémentation

Le skill est implémenté directement par Claude Code, qui :
1. Parse les arguments de la ligne de commande
2. Charge la configuration depuis `.env.local`
3. Utilise les outils MCP Notion pour interroger la database
4. Scanne `src/content/blog/` pour lister les articles existants
5. Effectue le matching titre par titre
6. Formate et affiche les résultats
