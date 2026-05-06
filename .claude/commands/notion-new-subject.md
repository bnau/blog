# /notion-new-subject

## Description

Crée rapidement un nouveau sujet dans la database Notion du backlog.

## Usage

```bash
/notion-new-subject [nom]
```

## Arguments

- `nom` (optionnel) : Le nom du nouveau sujet. Si omis, vous serez invité à le saisir.

## Exemples

```bash
# Création interactive
/notion-new-subject

# Création directe
/notion-new-subject "Nouveau sujet de blog"
```

## Comportement

1. Demande le nom du sujet (ou utilise l'argument fourni)
2. Demande optionnellement :
   - Description du sujet
   - Section/thématique (MLOps, Methods, Code assistant, etc.)
   - Formations liées
3. Crée une nouvelle page dans la database Notion des sujets
4. Confirme la création avec l'URL Notion

## Prérequis

- Authentification MCP Notion configurée (`/mcp`)
- Variable d'environnement `NOTION_SUBJECTS_DATABASE_ID` définie

## Sections disponibles

- MLOps
- Methods
- Code assistant
- Dev agentique
- Cloud
- Infra
- Model training
