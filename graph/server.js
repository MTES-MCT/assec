/**
 * https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
 */
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv-safe';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

// application
import schema from './data/schema';

dotenv.config();
const debug = require('assec-utils/lib/debug');
const logger = require('assec-utils/lib/logger');

const app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

if (debug()) {
  // use GraphQL web interface only in development environment
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

const GRAPHQL_PORT = process.env.PORT || 3000;
app.listen(GRAPHQL_PORT, () => {
  if (!debug()) return;
  logger.ok(`GraphiQL is now running under http://localhost:${GRAPHQL_PORT}/graphiql`);
});
