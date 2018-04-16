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
- [SASS](http://sass-lang.com)

> L'utilisation de `git rebase` en mode `--interactive` est obligatoire pour gérer les branches `git`.<br>
> `rebase` garantie une plus grande flexibilité d'utilisation que la commande `merge`

> Ce projet utilise le mode mono repo de [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)

> You can install and use [NVM](https://github.com/creationix/nvm) if you need to work with a different NodeJS version

> La base des deux applications Backoffice et Frontend ont été générées à l'aide de [create-react-app](https://github.com/facebook/create-react-app)

> L'API [GraphQL](http://graphql.org) utilise [Apollo](https://www.apollographql.com), c'est le client Apollo qui est utilisé pour les applications en React

> Les modules [Husky](https://github.com/typicode/husky), [ESLint](https://eslint.org), [StyleLint](https://stylelint.io) et [Prettier](https://prettier.io) permette de maintenir un cadre dévelopment continu en local, chaque commits est vérifié et formatté avant d'être poussé  sur le repository Git grâce au script `././scripts/hooks/precommit`

## Scripts

> En mode dévelopement le serveur de la base de données MongoDB doit être démarré avant de lancer les autres sous-projets<br>
> Les commandes `yarn dev:db` et `yarn dev` doivent être lancées dans des fenêtres du terminal différents<br>

**`yarn dev`**
- Lance tout le projet en mode dévelopment local

**`yarn dev:db`**
- Lance la base base de données MongoDB

**`yarn cleanup`**
- Supprime tous les dossiers `node_modules` des sous-projets
- Supprime tous les fichiers `yarn-error.log` des sous-projets
- Supprime tous les fichiers `package-lock.json` et `yarn.lock` des sous-projets
- Réinstalle toutes les dépendances `node_modules` des sous-projets 

**`yarn bump <patch|minor|major>`**
- Augmente la version du projet et des sous-projets

## Changelog
