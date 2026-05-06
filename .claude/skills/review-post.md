---
name: review-post
description: "Relire et améliorer un article de blog avant publication"
---

# Review Post - Relecture d'article de blog

Cette commande effectue une relecture complète et systématique d'un article de blog en plusieurs étapes.

## Workflow

### Étape 1 : Relecture bloc par bloc

1. Lire l'intégralité de l'article
2. Identifier les différents blocs logiques (introduction, sections, sous-sections, conclusion)
3. Pour chaque bloc :
   - Vérifier que les phrases sont syntaxiquement correctes. 
   - Le texte est dicté à la commande vocale. Si le texte ne semble pas cohérent avec le propos, il faut proposer une correction proche phonétiquement. 
4. Corriger

### Étape 2 : Correction orthographe, grammaire et style

Pour l'ensemble de l'article, corriger :
- Les fautes d'orthographe
- Les fautes de grammaire
- Les répétitions de mots (dans une même phrase ou paragraphe)
- Les tournures de phrases lourdes ou maladroites
- Les erreurs de ponctuation
- La cohérence des temps verbaux

**Important** : Effectuer les corrections directement dans le fichier sans demander de validation pour les fautes évidentes.

### Étape 3 : Vérification et ajout de liens

1. **Identifier les éléments documentables** :
   - Technologies, frameworks, bibliothèques
   - Outils, services, plateformes
   - Concepts techniques établis
   - Standards et spécifications

2. **Rechercher les liens officiels** :
   - Utiliser WebSearch pour trouver les documentations officielles
   - Privilégier les liens vers la documentation officielle (ex: site officiel, GitHub, MDN)
   - Éviter les liens vers des tutoriels tiers ou blogs

3. **Ajouter les liens** :
   - Ajouter un lien lors de la première mention de chaque élément
   - Format Markdown : `[élément](URL)`
   - Ne pas surcharger : un seul lien par concept

4. **Vérifier les liens existants** :
   - Utiliser WebFetch pour vérifier que les liens ne sont pas cassés
   - Remplacer ou supprimer les liens morts
   - Signaler les liens qui redirigent

### Étape 4 : Suggestions d'amélioration

Proposer des suggestions **très courtes** (maximum 1 ligne par suggestion) sur :
- Structure de l'article
- Exemples manquants
- Points qui mériteraient plus de détails
- Éléments qui pourraient être simplifiés
- Opportunités d'ajouter des schémas ou illustrations

Format des suggestions : liste à puces, une ligne par suggestion, style direct.

## Instructions d'exécution

1. Toujours lire l'article en entier avant de commencer
2. Progresser étape par étape, ne pas sauter d'étapes
3. Effectuer les corrections orthographiques/grammaticales directement
4. Être concis dans les retours à l'utilisateur
5. À la fin, fournir un résumé en 3-4 lignes de ce qui a été fait

## Contraintes

- Ne jamais modifier le sens technique du contenu
- Respecter le ton et le style de l'auteur
- Ne pas ajouter de contenu non demandé
- Garder la même structure de sections
- Préserver le frontmatter YAML intact (sauf correction de fautes)
