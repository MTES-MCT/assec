// https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
import zlib from 'zlib';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import GraphQLDate from 'graphql-date';
import GraphQLGeoJSON from 'graphql-geojson';
// import * as bodyParser from 'body-parser-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import { logger } from './utils/logger';
import { usedebug } from './utils/usedebug';

import schemas from './schemas';
import queries from './queries';
import mutations from './mutations';

const graphqlport = process.env.PORT;

// application
const schema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers: {
    Query: queries,
    Mutation: mutations,
    // custom types
    Date: GraphQLDate,
    GeoJSON: GraphQLGeoJSON,
  },
});

const app = express();
const bodylimit = '2mb';
const parserlimit = bodyParser.json({ limit: bodylimit });
app.use(cors());
app.use(parserlimit);
app.use(compression({ level: zlib.Z_DEFAULT_COMPRESSION }));
app.use(
  '/graphql',
  // bodyParser is needed just for POST.
  parserlimit,
  graphqlExpress({
    schema,
    // Apollo Server accepts a GraphQLOptions object as its single argument
    // @see apollographql.com/docs/apollo-server/setup.html#graphqlOptions
    debug: usedebug(),
  }),
);
app.use(bodyParser.urlencoded({
  extended: true,
  limit: bodylimit,
  parameterLimit: 100000,
}));

if (usedebug()) {
  // use GraphQL web interface only in development environment
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

// Do graceful shutdown
process.on('SIGINT', () => {
  logger.ok('graceful shutdown express');
  app.close(() => {
    // FIXME -> cleanup DB connections
    logger.debug('closed express');
  });
});

app.listen(graphqlport, () => {
  logger.ok(`GraphQL served under http://localhost:${graphqlport}/graphql`);
  if (!usedebug()) return;
  logger.ok(`GraphiQL is now running under http://localhost:${graphqlport}/graphiql`);
});
