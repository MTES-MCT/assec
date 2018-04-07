const mutationsTypeDefs = `
type Mutation {
  createPerson(
    email: String
    lastname: String
    firstname: String
  ): Person

  createDepartement(
    suos: [SUOS]
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

export default mutationsTypeDefs;
