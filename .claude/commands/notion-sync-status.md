# /notion-sync-status

## Description

Marque un sujet Notion comme "publié" quand l'article de blog correspondant est terminé.

## Usage

```bash
/notion-sync-status [slug]
```

## Arguments

- `slug` (optionnel) : Le slug de l'article de blog. Si omis, liste les posts récents.

## Exemples

```bash
# Liste les posts récents et propose la synchronisation
/notion-sync-status

# Synchronise un post spécifique
/notion-sync-status dvc
/notion-sync-status 2026-04-28-claude-code-team-agent
```

## Options

- `--dry-run` : Affiche ce qui serait fait sans modifier Notion
- `--force` : Skip la confirmation

## Comportement

1. Si `slug` fourni : utilise ce post, sinon liste les posts récents
2. Lit le frontmatter du post (titre, pubDate)
3. **Recherche dans Notion** : Query la database des sujets avec filtre sur nom = titre du post
4. Si trouvé :
   - Affiche le sujet trouvé et demande confirmation
   - Met à jour le sujet Notion avec :
     - Propriété "Statut" → "Publié" (si elle existe)
     - Propriété "Date de publication" → pubDate du post
     - Propriété "URL article" → Lien vers l'article sur le blog
5. Si pas trouvé :
   - Affiche un message explicatif
   - Propose une recherche fuzzy ou de créer le sujet dans Notion

## Algorithme de matching

- **Matching exact** : Recherche sur le nom (insensible à la casse)
- **Matching fuzzy** : Si pas de match exact, propose les sujets similaires (distance de Levenshtein)

## Prérequis

- Authentification MCP Notion configurée (`/mcp`)
- Variable d'environnement `NOTION_SUBJECTS_DATABASE_ID` définie
- L'article de blog doit avoir un titre correspondant à un sujet Notion

## Notes

Ce skill ne stocke aucun lien entre l'article et Notion. Il retrouve dynamiquement le sujet par matching de titre à chaque exécution.
