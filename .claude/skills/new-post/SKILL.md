---
name: new-post
description: Guide pour créer un nouvel article de blog technique avec le bon style rédactionnel . Utiliser quand l'utilisateur veut créer un nouvel article de blog.
---

# Création d'articles de blog

Guide pour créer des articles de blog techniques respectant le style rédactionnel établi.

## Workflow

### 1. Comprendre le sujet et identifier le type d'article

**Questions à poser** :
- Quel est le sujet principal de l'article ?
- Y a-t-il de la documentation ou des ressources de référence à charger dans le contexte ?
- Demander le type d'article souhaité. Proposer parmi les types d'articles mentionnés dans @references/writing-style.md
- Proposer des problématiques ou angles d'approche possibles. Demander à l'utilisateur de choisir celui qui lui convient le mieux.

**Important** : Identifier le type d'article détermine la structure à suivre (voir [writing-style.md](references/writing-style.md) pour les patterns détaillés).

### 2. Proposer un plan détaillé adapté au type

Selon le style d'article identifié, proposer un plan détaillé conforme aux patterns explicités dans [writing-style.md](references/writing-style.md).

**Demander des retours utilisateurs en boucle jusqu'à ce qu'il valide le plan proposé.**

**Attendre validation du plan avant de continuer.**


### 3. Rédiger un premier jet avec des placeholders

- Rédiger un squelette de l'article @src/content/blog/YYYY-MM-DD-TITLE/index.md
- Générer les sections principales avec placeholders
- **L'utilisateur complète à la main puis t'en informe, ou bien donne une instruction pour que tu complètes**. Boucle de feedback jusqu'à ce que l'article soit complet.

Utiliser le template approprié comme base : [article-template.md](assets/article-template.md)
