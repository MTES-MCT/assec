# ASSEC

> Optimiser la réponse collective du monde agricole et des services de l'État au problème de pénurie d'eau en période de sécheresse
https://beta.gouv.fr/startup/assec.html

## Requirements

- [GIT](https://git-scm.com)
- [NodeJS](https://nodejs.org/en/) <small>v8.11.0</small>
- [Yarn](https://yarnpkg.com/fr/) <small>v1.5.1</small>
- [MongoDB](https://www.mongodb.com) <small>v3.6.0</small>
- [React](https://reactjs.org) <small>v16.2.0</small>
- [GraphQL](http://graphql.org) <small>v0.13.2</small>
- [SASS](http://sass-lang.com)

> Use Git `rebase --interactive` instead of `merge` commands with branch, it grants you to re-order or modify your commits with ease and more readability

> This project use [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to manage a monorepo project

> You can install and use [NVM](https://github.com/creationix/nvm) if you need to work with a different NodeJS version

> Backoffice and Frontend apps were scaffolded with [create-react-app](https://github.com/facebook/create-react-app)

> API use [Apollo](https://www.apollographql.com) + [GraphQL](http://graphql.org)

> [Husky](https://github.com/typicode/husky) package combined with [ESLint](https://eslint.org), [StyleLint](https://stylelint.io) and [Prettier](https://prettier.io) provides a better way to check and maintain a consistent codebase between developers before pushing to Github using `precommit` git's hook

## Scripts
> In development you need to start MongoDB server before starting applications<br>
> `yarn dev:db` and `yarn dev` should be started in a different process window<br>

**`yarn dev`**
- Starts Frontend, Backoffice and API applications

**`yarn dev:db`**
- Starts MongoDB database for development mode

**`yarn cleanup`**
- Remove sub-projects `node_modules` packages
- Remove sub-projects `yarn-error.log` file
- Remove sub-projects `package-lock.json` and `yarn.lock` files
- Fresh `node_modules` folder install

**`yarn bump <patch|minor|major>`**
- Allows you to upgrade all project packages with one command

## Main Concepts & Dependencies

- [Create React apps with no build configuration](https://github.com/facebook/create-react-app)
- [React Redux](https://github.com/reactjs/react-redux)
- [The basics of GraphQL in 5 links](https://dev-blog.apollodata.com/the-basics-of-graphql-in-5-links-9e1dc4cac055)

## Softwares & Utils

- [QGis](https://www.qgis.org/fr/site/index.html)
- [GeoJSON.io](http://geojson.io)

## Changelog

#### v0.5.0
* ~~[ ] fix version to footer from package.json or database~~

#### v0.4.0
* ~~[ ] fix alert view~~
* [x] fix stepper index when show results
