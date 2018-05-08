// https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import GraphQLDate from 'graphql-date';
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
    Date: GraphQLDate,
    Mutation: mutations,
  },
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  '/graphql',
  // bodyParser is needed just for POST.
  bodyParser.json({ limit: '50mb' }),
  graphqlExpress({
    schema,
    // Apollo Server accepts a GraphQLOptions object as its single argument
    // @see apollographql.com/docs/apollo-server/setup.html#graphqlOptions
    debug: usedebug(),
  }),
);
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
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
