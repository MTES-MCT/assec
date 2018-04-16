# ASSEC Admin

## Environment Variables

```bash
NODE_ENV=development
# Port d'écoute du serveur
PORT=3100
# Version de l'application
REACT_APP_VERSION=0.7.6
# URI du serveur d'API GraphQL
REACT_APP_GRAPHQL_URI=http://localhost:3200/graphql
```

## Docker

**Build the image**
```bash
docker build -t assec/admin .
```

**Run the container (production)**
```bash
docker run -m "300M" --memory-swap "1G" -w "/home/node/app" -e \"NODE_ENV=production\" -d assec/admin
```

**Run the container (development)**
```bash
docker run -p 3000:3000 -e \"NODE_ENV=development\" -i -t assec/admin
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
