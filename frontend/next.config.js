const withSass = require('@zeit/next-sass');

const isproduction = process.env.NODE_ENV === 'production';

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
    usedebug: !isproduction,
    appversion: process.env.REACT_APP_VERSION,
    widgeturi: process.env.REACT_APP_WIDGET_URI,
    graphqluri: process.env.REACT_APP_GRAPHQL_URI,
  },
  assetPrefix: '/assec',
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
});
