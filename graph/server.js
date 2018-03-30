/**
 * https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
 */
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

// application
import schema from './data/schema';

const debug = require('assec-utils/lib/debug');
const logger = require('assec-utils/lib/logger');

const server = express();
server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
if (debug()) {
  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

const GRAPHQL_PORT = process.env.PORT || 3000;
server.listen(GRAPHQL_PORT, () => {
  if (!debug()) return;
  logger.ok(`GraphiQL is now running under http://localhost:${GRAPHQL_PORT}/graphiql`);
});
