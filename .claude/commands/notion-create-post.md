# /notion-create-post

## Description

Crée un nouvel article de blog à partir d'un sujet Notion du backlog.

## Usage

```bash
/notion-create-post [nom-du-sujet]
```

## Arguments

- `nom-du-sujet` (optionnel) : Le nom du sujet Notion à utiliser. Si omis, une liste de sujets disponibles sera affichée.

## Exemples

```bash
# Afficher la liste et sélectionner un sujet
/notion-create-post

# Créer directement depuis un sujet connu
/notion-create-post DVC
/notion-create-post "Claude Code"
```

## Comportement

1. Si aucun argument : affiche la liste des sujets disponibles et demande sélection
2. Récupère les détails du sujet depuis Notion (nom, description, section, formations)
3. Génère un slug à partir du nom du sujet
4. Crée le frontmatter avec :
   - `title` : Nom exact du sujet (pour matching futur)
   - `description` : Description depuis Notion (ou demande si vide)
   - `pubDate` : Date du jour
   - `relatedCourses` : Formations liées depuis Notion (si disponible)
   - `keywords` : Générés depuis la Section Notion
5. Crée le fichier markdown dans `src/content/blog/`
6. Ajoute des sections de template basées sur la thématique
7. Confirme la création et propose d'ouvrir le fichier
8. Optionnel : Propose de marquer le sujet dans Notion comme "En cours"

## Prérequis

- Authentification MCP Notion configurée (`/mcp`)
- Variable d'environnement `NOTION_SUBJECTS_DATABASE_ID` définie

## Notes

Le titre de l'article doit correspondre exactement au nom du sujet Notion pour permettre la synchronisation future via `/notion-sync-status`.
