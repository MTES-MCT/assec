export default `
type Mutation {
  createDepartement(
    code: String!
    label: String!
    usages: [SUOInput]!
    origines: [SUOInput]!
    situations: [SUOInput]!
  ): DepartementType

  createRestriction(
    label: String!
    usages: [ID]!
    origines: [ID]!
    department: ID!
    situations: [ID]!
    description: String!
    information: String
  ): RestrictionType

  createZone(
    help: String
    label: String!
    order: String!
    department: ID!
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
