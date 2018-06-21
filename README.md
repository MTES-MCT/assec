# ASSEC

> 🚰 Optimiser la réponse collective du monde agricole et des services de l'État au problème de pénurie d'eau en période de sécheresse
https://beta.gouv.fr/startup/assec.html

## Installation

1. **Install NodeJS**

[System Downloads](https://nodejs.org/en/download/)

2. **Install NVM (Node Version Manager)**

[Documentation](https://github.com/creationix/nvm#installation)

3. **Installer MongoDB**

[Installer MongoDB sous Mac avec Hombrew](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-with-homebrew)

4. **Création d'un dossier local de la base de données MongoDB**
```bash
# /data/db est le dossier par défaut à l'installation de mongodb
# l'application ASSEC utilise le dossier nommé 'mongodb'
# défini dans la # commande `yarn mongo` du package.json
sudo mkdir -p /mongodb/db
sudo chmod -R go+w /mongodb/db
```

5. **Récupération du projet et installation des librairies externes**
```bash
git clone git@github.com:MTES-MCT/assec.git
cd assec
nvm use
yarn install
```

**Cloner le wiki pour l'édition en local**

`git clone git@github.com:MTES-MCT/assec.wiki.git`

## Usages

1. **Démarrer la base de données MongoDB**
```bash
cd assec
yarn mongo
```

2. **Démarrer les applications web**

```bash
cd assec
yarn sass
yarn dev
```

> Pour le dévelopement local, le serveur de la base de données MongoDB doit être démarré avant de lancer les autres sous-projets, la configuration par défaut de MongoDB est utilisée, les deux commandes doivent être éxécutées dans des processus différents<br>

> Les variables d'environment sont chargées depuis le fichier [.env.development](./.env.development)

> Les ports ouverts pour l'application sont définis dans le fichier [Procfile](./Procfile)

- Frontend: http://localhost:3000
- Widget: http://localhost:3100
- Admin/Backoffice: http://localhost:3200
- Backend: http://localhost:3300

**Plus de détails**
[Wiki ASSEC](https://github.com/MTES-MCT/assec)
