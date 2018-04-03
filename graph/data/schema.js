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
  allPersons: [Person]
  allDepartements: [Departement]
}
`;

const personTypeDefs = `
type Person {
  id: String
  email: String
  lastname: String
  firstname: String
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
${personTypeDefs}
${departementTypeDefs}
`;

export default makeExecutableSchema({ typeDefs, resolvers });
