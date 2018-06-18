# ASSEC

> 🚰 Optimiser la réponse collective du monde agricole et des services de l'État au problème de pénurie d'eau en période de sécheresse
https://beta.gouv.fr/startup/assec.html

## Concept

Ce projet utilise le mode mono repo de [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)<br>

Le Backoffice et le Widget ont été générées à l'aide de [create-react-app](https://github.com/facebook/create-react-app)<br>

Le Frontend/Landing Page a été générée grâce à [NextJS](https://github.com/zeit/next.js/)<br>

Le Backend [GraphQL](http://graphql.org)/NodeJS/Express est exploitée via [Apollo GraphQL](https://www.apollographql.com)<br>

Le container Docker/Nginx utilise l'image [Docker Nginx Proxy](https://github.com/jwilder/nginx-proxy)

La librairie [Fabric Python](http://www.fabfile.org) est utilisée pour déployer l'application sur le serveur VPS OVH

## Installation

1. Création d'un dossier local de la base de données MongoDB
```bash
# /data/db est le dossier par défaut à l'installation de mongodb
sudo mkdir -p /data/db
sudo chmod -R go+w /data/db
```

2. Récupération du projet et installation des librairies externes
```bash
git clone git@github.com:MTES-MCT/assec.git
cd assec
nvm use
yarn install
```

## Usages

Pou le dévelopement local, le serveur de la base de données MongoDB doit être démarré avant de lancer les autres sous-projets, la configuration par défaut de MongoDB est utilisée, les deux commandes doivent être éxécutées dans des processus différents<br>

1. démarrer la base de données MongoDB**
```bash
# Processus 1
cd assec
yarn mongo
```


2. démarrer les applications web**

> Les variables d'environment sont chargées depuis le fichier [.env.foreman](./.env.development)

> Les ports ouverts pour l'application sont définis dans le fichier [Procfile](./Procfile)

```bash
# Processus 2
cd assec
yarn dev
```

## Contribution

Ne pas utiliser  `git push --force`, si un commit doit être remplacé il faut utiliser `git push --force-with-lease` qui vérifiera d'abord sur le serveur distant si une mise à jour du code est déjà en cours<br>

L'utilisation de `git rebase` en mode `--interactive` est préférée pour gérer les branches `git`.La commande `git rebase` garantie une plus grande flexibilité d'utilisation que la commande `merge`<br>

Afin de gèrer plusieurs version de NodeJS sur le même poste de dévelopement,  [NVM](https://github.com/creationix/nvm) doit être installé, le fichier [.nvmrc](./.nvmrc) défini quelle version de est utilisé pour ce projet<br>

Les modules [Husky](https://github.com/typicode/husky), [ESLint](https://eslint.org), [StyleLint](https://stylelint.io) et [Prettier](https://prettier.io) permettent de maintenir un cadre dévelopment continu pour l'environnement de dev, chaque commit est vérifié et formatté  grâce au script [pre-commit](./.scripts/hooks/pre-commit) avant d'être poussé  sur le repository Git distant

**En savoir plus**
[Wiki ASSEC](https://github.com/MTES-MCT/assec)

### Commandes

**`yarn dev`**
- Lance toutes les application en mode développment local

**`yarn build`**
- Compile toutes les applications pour une exploitaion Docker/Production

**`yarn compose`**
- Lance l'application dans un Docker local pour debug

**`yarn cleanup`**
- Supprime tous les dossiers `node_modules` des sous-projets
- Supprime tous les fichiers `yarn-error.log` des sous-projets
- Supprime tous les fichiers `package-lock.json` et `yarn.lock` des sous-projets
- Réinstalle toutes les dépendances `node_modules` des sous-projets 

**`yarn bump <patch|minor|major>`**
- Incrémente la version du projet et des sous-projets `workspaces` 
