# ASSEC Widget

## Environments

> Les fichiers .env sont obligatoires<br>
> La commande `yarn build` s'occupe de charger ces fichiers

```bash
# la variable PORT
# - est affectée par le Procfile
# - est affectée par le DockerFile
PORT=xxxx
NODE_ENV=development
REACT_APP_IGNKEY=xxx
REACT_APP_VERSION=x.x.x
REACT_APP_GRAPHQL_URI=http://localhost:3200/graphql
```

## Documentation

- [Documentation IGN](https://geoservices.ign.fr/documentation/donnees-ressources-wmts.html)

**Fond de carte OSM**<br>
`http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`
