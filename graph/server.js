/**
 * https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
 */

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import typeDefs from './types';
import * as resolvers from './resolvers';

const logger = require('assec-utils/lib/logger');

// application
const usedebug = process.env.NODE_ENV !== 'production';
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors());
app.use(
  '/graphql',
  // bodyParser is needed just for POST.
  bodyParser.json(),
  graphqlExpress({
    schema,
    // Apollo Server accepts a GraphQLOptions object as its single argument
    // @see apollographql.com/docs/apollo-server/setup.html#graphqlOptions
    debug: usedebug,
  }),
);

if (usedebug) {
  // use GraphQL web interface only in development environment
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

const GRAPHQL_PORT = process.env.PORT || 3000;
app.listen(GRAPHQL_PORT, () => {
  if (!usedebug) return;
  logger.ok(`GraphiQL is now running under http://localhost:${GRAPHQL_PORT}/graphiql`);
});
