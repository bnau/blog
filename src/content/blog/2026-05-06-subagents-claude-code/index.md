---
title: "Spécialisez vos agents avec les sous-agents de Claude Code"
description: "Découvrez comment les sous-agents de Claude Code permettent de structurer vos workflows de développement, préserver votre contexte et améliorer votre productivité."
pubDate: "May 06 2026"
cover: "cover.png"
---

Pour répondre à une tâche, les agents IA ont besoin d'avoir des instructions spécifiques au travail qu'ils doivent résoudre. Dans le cadre d'un agent devant manipuler du code, il est courant de lui fournir des informations particulières au projet. Par exemple, la structure du code source, un moyen d'accéder à la documentation des outils utilisés, ou encore la manière de compiler et de tester le projet. C'est ce qu'on appelle le contexte.

Cependant, plus le contexte grossit, plus l'agent risquera d'halluciner. Dans un projet de développement, le contexte peut rapidement devenir volumineux. Il est donc préférable d'avoir plusieurs agents spécialisés dans différentes tâches, plutôt qu'un seul agent global sachant résoudre l'intégralité des problématiques.

Il existe de nombreuses solutions dans l'écosystème des agents de code. Aujourd'hui, nous étudierons la solution proposée par [Claude Code](https://code.claude.com/), à savoir les sous-agents. 

---

## Qu'est-ce qu'un sous-agent ?

Un sous-agent est simplement un agent exécuté en parallèle par Claude Code. Comme ce dernier est lui-même un agent, cette notion d'agent supplémentaire est appelée sous-agent. 

### L'analogie de l'équipe projet

Dans une équipe projet, les différents coéquipiers ont souvent des rôles différents. On peut imaginer une équipe constituée d'un PO, d'un QA, de plusieurs développeurs, d'un SRE, etc. Même si la connaissance du projet est partagée entre tous les membres de l'équipe, chaque membre a son domaine d'expertise. Par exemple, le PO aura une meilleure connaissance de la roadmap, le développeur aura une meilleure connaissance du code source, etc. De même, les tâches que chaque membre doit réaliser sont différentes. 

On peut utiliser cette analogie pour définir nos différents agents dans notre projet. Chaque membre de l'équipe pourrait être représenté par un agent spécialisé. Cet agent aura des instructions particulières, une suite d'outils spécifique et minimale qu'il pourra utiliser. Il pourra être déclenché à des phases précises du projet.
Par exemple, un sous-agent responsable de la roadmap pourra aider à la rédaction des US avant qu'elles soient implémentées par le sous-agent de développement. 

Chaque sous-agent aura donc sa propre fenêtre de contexte qui sera bien plus restreinte que celle d'un seul agent principal. Par exemple, si on crée un sous-agent avec le profil développeur frontend saura qu'il devrai valider la qualité de son code avec la commande `npm run lint`. Les autres sous-agents n'auront pas besoin d'avoir cette information. 

> Il est important de donner au sous-agent les moyens de savoir comment exécuter sa tâche, mais aussi de savoir comment vérifier qu'il l'a bien réalisée. Un sous-agent de développement devra connaître la façon de lancer ses tests, son linter, sa compilation, etc. 


---

## Créons notre premier sous-agent personnalisé

Cet agent sera spécialisé dans la documentation technique de projets. Il aura pour rôle de lire la code base d'un projet existant et de générer une documentation sous le format [Diátaxis](https://diataxis.fr/).
> Diátaxis est un framework de documentation technique qui recommande de structurer la documentation en quatre catégories : les tutoriels, les guides de référence, les guides d'utilisation et les explications.

### Étape 1 : Créer le fichier de définition

Les sous-agents de Claude Code sont définis au moyen de fichiers Markdown dans le répertoire `.claude/agents/` du projet. Chaque agent correspond à un fichier dont le nom représente le nom de l'agent, par exemple `doc-writer.md` pour notre agent de documentation.

Pour créer notre agent, commençons par créer le répertoire s'il n'existe pas, puis le fichier de définition :

```bash
mkdir -p .claude/agents
touch .claude/agents/doc-writer.md
```

Le fichier `doc-writer.md` contiendra toute la configuration et les instructions de notre agent spécialisé dans la documentation technique.

### Étape 2 : Définir le frontmatter

Le frontmatter YAML, placé en début de fichier, configure les paramètres de votre sous-agent. C'est ici que nous définissons son déclenchement, ses capacités et son comportement.

```yaml
---
name: doc-writer
description: "Generate code documentation"
tools:
  - Read
  - Grep
  - Glob
  - Write
model: haiku
skills:
  - diataxis-documentation
---
```

Détaillons chaque champ :

- **`description`** : C'est le **champ le plus important**. Cette phrase est lue par l'agent principal, ici Claude Code, pour décider s'il doit déclencher ce sous-agent. Elle doit être claire et spécifique.

- **`tools`** : La liste des outils disponibles pour cet agent. Pour plus d'informations sur les outils disponibles, voir la [documentation](https://code.claude.com/docs/en/tools-reference). Ici, nous donnons accès à des outils de lecture, d'écriture et de recherche dans les fichiers. Par défaut, tous les outils sont autorisés.

- **`model`** : Le modèle [Claude](https://www.anthropic.com/claude) à utiliser (optionnel). Aujourd'hui, `haiku` est le plus rapide et le moins coûteux des modèles d'Anthropic disponibles.

- **`skills`** : Liste des skills à charger dans le contexte de l'agent. Nous utiliserons une skill [diataxis-documentation](https://smithery.ai/skills/abatilo/diataxis-documentation) préexistante.

Il existe d'autres champs intéressants qui ne sont pas utilisés dans l'exemple :

- **`memory`** : Active la mémoire persistante pour ce sous-agent (voir section dédiée plus bas).

- **`mcpServers`** : Liste des serveurs [MCP](https://modelcontextprotocol.io/) auxquels cet agent peut se connecter.

- **`hooks`** : Ensemble de commandes que cet agent peut déclencher lors de son cycle de vie. 
  
---

### Étape 3 : Rédiger les instructions

Après le frontmatter, tout le contenu Markdown du fichier devient les **instructions** du sous-agent. C'est ici que nous définissons précisément sa mission, ses méthodes de travail et les contraintes qu'il doit respecter.

Voici un exemple d'instructions pour notre agent de documentation :

```markdown
# Documentation Generator Agent

You are a specialized agent for generating code documentation following the Diátaxis framework.

## Your mission

Analyze code files in @src and generate documentation in @docs following the Diátaxis structure.
```

> Dans cet exemple, nous ne donnons aucune information concernant les règles de rédaction de Diátaxis car elles sont chargées par la skill lors de l'exécution. 

### Étape 4 : Installer la skill de documentation Diátaxis

Dans un terminal, exécutez la commande suivante :

```bash
npx -y smithery skill add abatilo/diataxis-documentation --agent claude-code
```

### Étape 5 : Tester l'agent

Une fois notre agent créé et la skill installée, il est temps de le tester. Il existe deux façons de déclencher un sous-agent.

#### Déclenchement automatique

La première méthode consiste à laisser Claude Code décider lui-même quand utiliser le sous-agent. Pour cela, on peut formuler notre demande naturellement :

```
Génère la documentation du code source
```

Claude lira le champ `description` de tous les sous-agents disponibles et choisira automatiquement `doc-writer` car sa description correspond à la demande formulée.

Si le sous-agent n'est pas déclenché, on peut demander explicitement de l'appeler :

```
Use the doc-writer agent to generate documentation for the src directory
```

Lorsque le sous-agent est déclenché, l'interface de Claude Code doit nous en informer.

> En règle générale, lorsqu'un agent ne se déclenche pas, le problème vient de sa description qui n'est pas suffisamment explicite. N'hésitez pas à clarifier quelle est la tâche que l'agent résout et quand il doit se déclencher.

#### Déclenchement manuel

Pour forcer l'utilisation d'un sous-agent spécifique, on peut le mentionner explicitement :

```
@"doc-writer (agent)"
```

Cette approche est utile pour tester et débugger notre agent.

### Code complet

L'ensemble du code source est disponible sur mon [GitHub](https://github.com/bnau/blog-post-subagent)

---

## Les sous-agents intégrés

Claude Code embarque 5 sous-agents :

- `Explore` : spécialisé dans l'exploration de codebase
- `Plan` : conçoit des plans d'implémentation
- `general-purpose` : agent utilisé pour les tâches, mélangeant l'exploration et le déclenchement d'actions
- `claude-code-guide` : assistant pour la documentation de Claude Code
- `statusline-setup` : gère la barre de statut

---

## Sous-agents avec mémoire persistante

Chaque invocation d'un sous-agent crée une nouvelle fenêtre de contexte. Pour conserver des informations obtenues lors de sessions précédentes, les sous-agents peuvent avoir une mémoire persistante.

Dans le cas de notre sous-agent d'écriture de documentation, l'agent commence par explorer l'intégralité du code source pour en extraire des informations. À chaque réexécution, il relira l'intégralité du code, ce qui sera gourmand en tokens. En activant la mémoire persistante, le sous-agent pourra simplement relire les informations qu'il avait obtenues lors des sessions précédentes. De plus, il pourra se souvenir que nous voulons utiliser les conventions de Diátaxis et ainsi nous affranchir de la skill utilisée lors de la première rédaction.


Pour activer la mémoire persistante, il suffit d'ajouter le champ `memory` dans le frontmatter du sous-agent. La valeur de ce champ déterminera l'emplacement de sauvegarde de cette mémoire :

- `project` : La mémoire est stockée dans le dossier du projet. Elle peut être versionnée et partagée aux autres membres de l'équipe.
- `local` : La mémoire est stockée par projet dans la home de l'utilisateur courant. Ainsi, elle ne sera pas versionnée.
- `user` : La mémoire est stockée dans la home de l'utilisateur courant. Elle pourra être partagée avec d'autres projets si un sous-agent du même nom y est installé.

Modifions notre sous-agent en conséquence. En plus de l'activation de la mémoire, nous allons changer ses instructions pour lui indiquer qu'il doit détecter les conventions de documentation si une version existe et qu'il doit enregistrer les informations relatives au code lors de son exploration.

```markdown
---
description: "Generate code documentation"
tools:
  - Read
  - Grep
  - Glob
  - Write
model: haiku
memory: project
---
# Documentation Generator Agent

You are a specialized agent for generating code documentation.

## Your mission

Analyze code files in @src and generate documentation in @docs.
If any documentation version already exists, detect the conventions used and apply them to your work.
Read your memory before exploring the codebase. If you find documentation conventions, apply them to your work.

## Memory
- Update your agent memory and remember any information about the codebase that might be useful for documentation (file structure, code patterns, architectural decisions, etc.)
- Update your agent memory with any information about documentation conventions you find.

```

---

En réexécutant l'agent, il devrait lire la première version de la documentation qui a été précédemment générée, détecter que nous voulons une convention orientée Diátaxis et la stocker dans sa mémoire. Nous pourrons nous libérer de la skill que nous avions installée.

```
Génère la documentation du code source
```

Après cette deuxième exécution, un nouveau fichier `.claude/agent-memory/doc-writer/MEMORY.md` a été créé. Il devrait avoir identifié les conventions de documentation et stocker des informations importantes concernant le projet. 

> Ce nouveau fichier fera partie du code source du projet. Il doit donc garder un certain niveau de qualité. On est invité à le relire et à le corriger si nécessaire.

---

## Sous-agents et skills : un mariage courant

Les sous-agents combinent à la fois une configuration restreinte pour avoir une fenêtre de contexte minimale et des instructions pour disposer d'informations sur la tâche à réaliser. Cependant, si deux sous-agents ont besoin des mêmes connaissances, ou si on veut pouvoir les transmettre à l'agent principal, on risque de dupliquer des informations dans les fichiers de définition Markdown.

C'est là que les skills entrent en jeu. Une skill est simplement un ensemble d'instructions qui seront chargées au runtime par un agent. Pour rendre nos spécifications réutilisables, il sera souvent judicieux de déporter une grande partie des instructions dans des skills. On donnera au sous-agent accès à ces skills, et ses instructions ne contiendront qu'une description de sa mission et de son workflow.

---

## Surveiller les coûts et la consommation de tokens

Un des grands enjeux des sous-agents est de réduire la taille de la fenêtre de contexte et donc de réduire la consommation de tokens. Qui dit optimisation, dit aussi mesure.

Aujourd'hui, Anthropic propose trop peu d'outils d'auditabilité à mon goût. Heureusement, le projet [ccusage](https://ccusage.com/) pallie ce manque. Il permet de visualiser la consommation de tokens selon différents regroupements : par fenêtre de temps, par session, etc.

Par exemple, pour obtenir la consommation de tokens de la dernière session, on peut exécuter :

```bash
npx ccusage session -i $(cat $(ls -td ~/.claude/sessions/* | head -1) | jq .sessionId)
```

La réponse sera de la forme :

| Timestamp | Model             | Input  | Output | Cache Create | Cache Read | Cost (USD) |
|-----------|-------------------|--------|--------|--------------|------------|------------|
| 2026-05-06 | haiku-4-5 | 45,370 | 411    | 0            | 0          | $0.00      |

> La dernière session ne correspondra pas forcément à l'exécution du sous-agent. En cas de doute, je vous invite à lister plusieurs sessions et à identifier laquelle correspond.

L'outil permet d'exporter les données au format JSON. Ceci permet de transmettre facilement les données à un outil de monitoring et de suivre l'évolution de la consommation de token pour le sous-agent.

---

## Conclusion

Les sous-agents de Claude Code offrent un moyen de spécialiser des agents pour des tâches spécifiques, à condition de bien savoir comment les orchestrer. Ce sera l'objet d'un futur article.

---

**Liens utiles :**

- [Documentation officielle des sous-agents](https://code.claude.com/docs/fr/sub-agents)
- [Code source de l'exemple](https://github.com/bnau/blog-post-subagent)
