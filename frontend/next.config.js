const withSass = require('@zeit/next-sass');

module.exports = withSass({
  distDir: 'build',
  publicRuntimeConfig: {
    // variables d'environnement
    // DEV
    // ---------
    // pour le dev elles sont definies par le lancement de la commande
    // `yarn dev`
    // @see ./../package.json.{dev}
    //
    // Production
    // ---------
    appversion: process.env.REACT_APP_VERSION,
    widgeturi: process.env.REACT_APP_WIDGET_URI,
    graphqluri: process.env.REACT_APP_GRAPHQL_URI,
    usedebug: process.env.NODE_ENV !== 'production',
  },
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
});
