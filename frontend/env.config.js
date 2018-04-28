module.exports = {
  'process.env.USE_DEBUG': process.env.NODE_ENV !== 'production',
  'process.env.APP_VERSION': process.env.REACT_APP_VERSION,
  'process.env.WIDGET_URI': process.env.REACT_APP_WIDGET_URI,
  'process.env.GRAPHQL_URI': process.env.REACT_APP_GRAPHQL_URI,
};
