---
title: "Infrastructure as True Code avec Pulumi"
conferences:
  - name: "Devoxx France 2025"
    date: "2025-04-24"
    replayLink: "https://youtu.be/UAHUOlQpgPc?si=REKEIW5w2bv1VI3Y"
  - name: "Volcamp 2024"
    date: "2024-10-10"
    replayLink: "https://youtu.be/R__Fuf8pY40?si=-Zl6FTJV1BpdUMDT"
  - name: "Sunny Tech 2024"
    date: "2024-07-05"
    replayLink: "https://youtu.be/yQH6vuXvMeU?si=6aB83YMnL8vdGAbM"
---

Vous connaissez peut-être l'Infrastructure as Code, cette façon de décrire le contenu d’une infrastructure cible dans du code source.
Presque toutes les solutions existantes (Terraform, CloudFormation…) proposent un paradigme identique, à savoir déclarer les ressources à provisionner dans des fichiers de configuration.

Certaines solutions fournissent également quelques options pour donner plus de flexibilité au développeur comme des expressions (déclaration de variables, boucles for…), des imports de modules, du templating, etc.
Malheureusement, de par l'approche déclarative, on est limité aux fonctionnalités proposées par l'outil choisi pour gérer notre IaC. Et si vous pouviez utiliser votre langage favori pour créer votre infra AWS, vos ressources Kubernetes, etc?
C'est ce que permet Pulumi, coder son infrastructure avec un langage traditionnel (JavaScript, Python, Go, Java...).

Dans cette session, je vous présenterai cet outil, les avantages qu'il apporte et implémenterai une infrastructure from scratch.