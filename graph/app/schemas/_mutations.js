const mutationsDefs = `
type Mutation {
  createDepartement(
    code: String!
    name: String!
    suos: SUOSInput!
  ): DepartementType

  createRestriction(
    dpt: ID!
    title: String!
    usages: [String]!
    origines: [String]!
    description: String!
    situations: [String]!
    information: String
  ): RestrictionType

  updateDepartement(
    id: ID!
    suos: SUOSInput!
  ): DepartementType

  deleteDepartment(
    id: ID!
  ): DepartementType

  deleteRestriction(
    id: ID!
  ): RestrictionType
}
`;

export default mutationsDefs;
