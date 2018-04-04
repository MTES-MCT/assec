const personTypeDefs = `
type Person {
  id: String
  email: String
  lastname: String
  firstname: String
}
`;

const queriesTypeDefs = `
type Query {
  allPersons: [Person]
}

type Mutation {
  createPerson(
    email: String
    lastname: String
    firstname: String
  ): Person
}
`;

const typedefinitions = `
${queriesTypeDefs}
${personTypeDefs}
`;

export default typedefinitions;
