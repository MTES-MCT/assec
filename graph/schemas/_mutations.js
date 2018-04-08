const mutationsDefs = `
type Mutation {
  createDepartement(
    code: String!
    name: String!
    suos: SUOSInput!
  ): DepartementType

  updateDepartement(
    id: ID!
    code: String
    name: String
    suos: SUOSInput
  ): DepartementType

  deleteDepartment(
    id: ID!
  ): String
}
`;

export default mutationsDefs;
