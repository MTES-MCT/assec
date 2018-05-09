export default `
type Mutation {
  createDepartement(
    code: String!
    label: String!
    usages: [String]!
    origines: [String]!
    situations: [String]!
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
    name: String!
    order: String!
    department: ID!
    geojson: String!
    shortname: String!
    alerte: [AlerteInput]
  ): ZoneType

  createSubscriber(
    email: String!
    department: ID!
  ): SubscriberType

  updateZoneAlerte(
    id: ID!
    situationid: ID!
  ): ZoneType

  updateDepartement(
    id: ID!
    suos: SUOSInput!
  ): DepartementType

  updateRestriction(
    id: ID!
    usages: [ID]!
    label: String!
    origines: [ID]!
    department: ID!
    situations: [ID]!
    information: String
    description: String!
  ): RestrictionType

  deleteDepartment(
    id: ID!
  ): DepartementType

  deleteRestriction(
    id: ID!
  ): RestrictionType

  deleteSubscriber(
    id: ID!
  ): SubscriberType

  deleteZone(
    id: ID!
  ): ZoneType
}
`;
