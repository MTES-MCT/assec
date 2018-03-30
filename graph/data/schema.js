/**
 *
 * GraphQL Schemas
 *
 */
import { makeExecutableSchema } from 'graphql-tools';

// application
import resolvers from './resolvers';

// Queries that users are allowed to make
const queryTypeDefs = `
type Query {
  allDepartements: [Departement]
}
`;

const departementTypeDefs = `
type Departement {
  id: Int
  code: String
  name: String
  slug: String
}
`;

const typeDefs = `
${queryTypeDefs}
${departementTypeDefs}
`;

export default makeExecutableSchema({ typeDefs, resolvers });
