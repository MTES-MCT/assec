export default `
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

  createZone(
    dpt: ID!
    help: String
    name: String!
    order: String!
    geojson: String!
    alerte: [AlerteInput]
  ): ZoneType

  updateDepartement(
    id: ID!
    suos: SUOSInput!
  ): DepartementType

  updateZoneAlerte(
    id: ID!
    alerte: AlerteInput!
  ): ZoneType

  deleteDepartment(
    id: ID!
  ): DepartementType

  deleteRestriction(
    id: ID!
  ): RestrictionType

  deleteZone(
    id: ID!
  ): ZoneType
}
`;
