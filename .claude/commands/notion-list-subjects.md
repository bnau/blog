# /notion-list-subjects

## Description

Liste les sujets disponibles dans le backlog Notion pour la création d'articles de blog.

## Usage

```bash
/notion-list-subjects [options]
```

## Options

- `--section [nom]` : Filtrer par thématique (MLOps, Methods, Code assistant, Dev agentique, Cloud, Infra, Model training)
- `--formation [nom]` : Filtrer par formation associée
- `--available` : Afficher uniquement les sujets sans article (défaut)
- `--all` : Afficher tous les sujets

## Exemples

```bash
# Lister tous les sujets disponibles (sans article)
/notion-list-subjects

# Lister tous les sujets d'une section spécifique
/notion-list-subjects --section "MLOps"

# Lister tous les sujets (même ceux avec article)
/notion-list-subjects --all
```

## Comportement

1. Interroge la database Notion des sujets
2. Lit tous les articles de blog existants dans `src/content/blog/`
3. Pour chaque sujet, tente de trouver un article correspondant par matching de titre
4. Affiche : Nom, Section, Description, Formations liées, Statut (✓ article existant, ✗ pas d'article)
5. Trie par : sujets sans article d'abord, puis par date de création

## Prérequis

- Authentification MCP Notion configurée (`/mcp`)
- Variable d'environnement `NOTION_SUBJECTS_DATABASE_ID` définie
