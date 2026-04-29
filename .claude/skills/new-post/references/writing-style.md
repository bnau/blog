# Style rédactionnel

Ce document décrit les patterns de structure et le style rédactionnel attendu pour les articles du blog, basé sur l'analyse des articles existants.

## Patterns de structure par type d'article

###  Article de présentation d'outil ou de framework

- **Introduction** : contexte général, raison du sujet, problématique abordée
- **Section 1** : présentation générale de l'outil/framework, ses fonctionnalités clés...
- **Sections 2-N** : dépend du plan précédemment défini, mais plusieurs types de sections sont récurrentes :
  - **Comparaison** : avec les alternatives existantes, en mettant en avant les différences et avantages
  - **Guide de démarrage** : comment installer et utiliser l'outil pour la première fois
  - **Cas d'usage avancés** : exemples concrets d'utilisation dans des projets réels
  - **Utilisation dans un cas pratique** : comment intégrer l'outil dans une architecture plus large
- **Conclusion** : synthèse des points clés, opinion personnelle, liens utiles

### Visuels et diagrammes

- **Diagrammes d'architecture** : toujours ajouter une légende descriptive (ex: "Étapes d'une pipeline ML")
- **Captures d'écran** : pour les interfaces, résultats de commandes, ou plugins
- **Placement** : juste après l'explication textuelle correspondante
- **Format** : `![Description](nom-fichier.png)`

## Profondeur technique attendue

- **Longueur cible** : ~300 lignes de Markdown
- **Sections principales** : 4-6 sections de contenu (hors intro/conclusion)
- **Liens utiles** : 2-4 liens pertinents (documentation officielle, GitHub, ressources)

## Ton et style général

- **Ton professionnel mais accessible** : éviter le jargon sans explication
- **Phrases courtes et claires** : favoriser la lisibilité
- **Impliquer le lecteur** : utiliser "nous" ou "on" régulièrement
- **Exemples concrets et applicables** : privilégier les cas réels plutôt que fictifs

### Structure générale d'introduction (2-3 paragraphes)

1. **Accroche** : importance du sujet ou contexte général
2. **Problème** : enjeu identifié ou besoin
3. **Annonce** : ce que l'article va couvrir

### Structure de conclusion

1. **Récapitulatif** : synthèse des points clés (1-2 paragraphes)
2. **Opinion personnelle** (optionnel) : "Je terminerai sur une remarque..." ou "Comme nous avons pu le voir..."
3. **Ouverture** : perspective future ou recommandation

### Éléments récurrents

- **Blocs de code** avec syntaxe appropriée et commentaires
- **Listes à puces** pour synthétiser les points clés ou options disponibles
- **Section finale "Liens utiles"** avec séparateur `---` avant

## Recommandations supplémentaires

- Expliquer le "pourquoi" avant le "comment"
- Anticiper les questions du lecteur
- Maintenir une progression logique tout au long de l'article
- Pour les comparaisons : montrer d'abord les différences, puis l'unification
- Pour les guides techniques : partir du général vers le spécifique
