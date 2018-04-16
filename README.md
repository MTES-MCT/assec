# ASSEC

> 🚰 Optimiser la réponse collective du monde agricole et des services de l'État au problème de pénurie d'eau en période de sécheresse
https://beta.gouv.fr/startup/assec.html

## Requirements

- [GIT](https://git-scm.com)
- [NodeJS](https://nodejs.org/en/) <small>v8.11.0</small>
- [Yarn](https://yarnpkg.com/fr/) <small>v1.5.1</small>
- [MongoDB](https://www.mongodb.com) <small>v3.6.0</small>
- [React](https://reactjs.org) <small>v16.2.0</small>
- [GraphQL](http://graphql.org) <small>v0.13.2</small>
- [Node Foreman](https://github.com/strongloop/node-foreman)
- [SASS](http://sass-lang.com)

## Installation

```bash
git clone git@github.com:MTES-MCT/assec.git
cd assec && yarn install
```

## Concept & Contribution

#### Concept

> Ce projet utilise le mode mono repo de [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/), l'API GrapQL et les applications Frontend et Backend sont contenues dans le même repository dans des sous dossiers définis par la propriété  [workspaces](.package.json) du pakage.json<br>

> La base des deux applications Backoffice et Frontend ont été générées à l'aide de [create-react-app](https://github.com/facebook/create-react-app)<br>

> L'API [GraphQL](http://graphql.org) utilise [Apollo](https://www.apollographql.com), le client Apollo est utilisé pour les applications en React afin de pouvoir interroger cette API

#### Contribution

> Ne pas utiliser  `git push --force`, si un commit doit être remplacé il faut utiliser `git push --force-with-lease` qui vérifiera d'abord sur le serveur distant si une mise à jour du code est déjà en cours<br>

> L'utilisation de `git rebase` en mode `--interactive` est obligatoire pour gérer les branches `git`.<br>

> `rebase` garantie une plus grande flexibilité d'utilisation que la commande `merge`<br>

> Afin de gèrer plusieurs version de NodeJS sur le même poste de dévelopement,  [NVM](https://github.com/creationix/nvm) doit être installé, le fichier [.nvmrc](./.nvmrc) défini quelle version de est utilisé pour ce projet<br>

> Les modules [Husky](https://github.com/typicode/husky), [ESLint](https://eslint.org), [StyleLint](https://stylelint.io) et [Prettier](https://prettier.io) permettent de maintenir un cadre dévelopment continu pour l'environnement de dev, chaque commit est vérifié et formatté  grâce au script [pre-commit](./.scripts/hooks/pre-commit) avant d'être poussé  sur le repository Git distant

## Usage & Environnements

#### Developement Local

> En mode dévelopement local le serveur de la base de données MongoDB doit être démarré avant de lancer les autres sous-projets<br>

> Les commandes `yarn dev:mongo` et `yarn dev` doivent être éxécutées par des processus différents<br>

> C'est la configuration de base qui est utilisée pour MongoDB

1. Lancer la base de données MongoDB
```bash
yarn dev:mongo
```

2. Lancer les applications en local
```bash
yarn dev
```

#### Developement Préproduction (Docker)

Lancer les applications en local grâce à une machine virtuelle Docker
```bash
yarn compose
```

## Scripts & Commandes

**`yarn cleanup`**
- Supprime tous les dossiers `node_modules` des sous-projets
- Supprime tous les fichiers `yarn-error.log` des sous-projets
- Supprime tous les fichiers `package-lock.json` et `yarn.lock` des sous-projets
- Réinstalle toutes les dépendances `node_modules` des sous-projets 

**`yarn bump <patch|minor|major>`**
- Incrémente la version du projet et des sous-projets `workspaces` 

**`yarn build`**
- Compile les deux projets en React, l'application Frontend et l'application Admin en mode production

## Changelog
