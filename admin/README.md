# ASSEC Admin

## Environments

> Les fichiers .env sont obligatoires<br>
> La commande `yarn build` de create-react-app permet de charger ces fichiers

```bash
PORT=3100
REACT_APP_GRAPHQL_URI=http://localhost:3200/graphql
```

## MongoDB

**Import des Départements Français depuis le JSON**
```bash
mongoimport --jsonArray --db assec --collection french_departments --file ./datas/departements.json --port 27018
```

## Server

- [Morgan Logger](https://github.com/expressjs/morgan)

#### Admin Templates

- [ant.design](https://ant.design)
- [MongoUI](https://github.com/azat-co/mongoui)
- [Mongo Express](https://github.com/mongo-express/mongo-express)
- [KeystoneJS](http://keystonejs.com/)
- [Rubix](http://rubix.sketchpixy.com)
