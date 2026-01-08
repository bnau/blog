---
title: 'Guide de style Markdown'
description: 'Voici un exemple de syntaxe Markdown de base pouvant être utilisée lors de la rédaction de contenu Markdown dans Astro.'
pubDate: 'Jun 19 2024'
---

Voici un exemple de syntaxe Markdown de base pouvant être utilisée lors de la rédaction de contenu Markdown dans Astro.

## Titres

Les éléments HTML `<h1>` à `<h6>` représentent six niveaux de titres de section. `<h1>` est le niveau le plus élevé tandis que `<h6>` est le plus bas.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Paragraphe

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Images

### Syntaxe

```markdown
![Texte alternatif](./chemin/complet/ou/relatif/de/image)
```

### Résultat

![blog placeholder](../../assets/blog-placeholder-about.jpg)

## Citations

L'élément blockquote représente du contenu cité d'une autre source, éventuellement avec une citation qui doit être dans un élément `footer` ou `cite`, et éventuellement avec des modifications en ligne telles que des annotations et des abréviations.

### Citation sans attribution

#### Syntaxe

```markdown
> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Remarque** vous pouvez utiliser la _syntaxe Markdown_ dans une citation.
```

#### Résultat

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Remarque** vous pouvez utiliser la _syntaxe Markdown_ dans une citation.

### Citation avec attribution

#### Syntaxe

```markdown
> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>
```

#### Résultat

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.

## Tableaux

### Syntaxe

```markdown
| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |
```

### Résultat

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## Blocs de code

### Syntaxe

On peut utiliser 3 backticks ``` sur une nouvelle ligne, écrire le code et fermer avec 3 backticks sur une nouvelle ligne. Pour mettre en évidence la syntaxe d'un langage spécifique, écrire le nom du langage après les 3 premiers backticks, par exemple html, javascript, css, markdown, typescript, txt, bash

````markdown
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```
````

### Résultat

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

## Types de listes

### Liste ordonnée

#### Syntaxe

```markdown
1. Premier élément
2. Deuxième élément
3. Troisième élément
```

#### Résultat

1. Premier élément
2. Deuxième élément
3. Troisième élément

### Liste non ordonnée

#### Syntaxe

```markdown
- Élément de liste
- Autre élément
- Et un autre élément
```

#### Résultat

- Élément de liste
- Autre élément
- Et un autre élément

### Liste imbriquée

#### Syntaxe

```markdown
- Fruit
  - Pomme
  - Orange
  - Banane
- Produits laitiers
  - Lait
  - Fromage
```

#### Résultat

- Fruit
  - Pomme
  - Orange
  - Banane
- Produits laitiers
  - Lait
  - Fromage

## Autres éléments — abbr, sub, sup, kbd, mark

### Syntaxe

```markdown
<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
```

### Résultat

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
