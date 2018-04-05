const entitiesTypeDefs = `
type Person {
  id: String
  email: String
  lastname: String
  firstname: String
}

type Departement {
  id: String
  code: String
  name: String
  slug: String
}

type Restriction {
  id: String
  departement: String
  description: String
  informations: String
}
`;

const queriesTypeDefs = `
type Query {
  allPersons: [Person]
  allRestrictions: [Restriction]
  allDepartements: [Departement]
  allDepartementRestrictions(departement: String): [Restriction]
}
`;

const mutationsTypeDefs = `
type Mutation {
  createPerson(
    email: String
    lastname: String
    firstname: String
  ): Person

  createDepartement(
    code: String
    name: String
  ): Departement

  createRestriction(
    departement: String
    description: String
    informations: String
  ): Restriction
}
`;

const typedefinitions = `
${queriesTypeDefs}
${entitiesTypeDefs}
${mutationsTypeDefs}
`;

export default typedefinitions;
