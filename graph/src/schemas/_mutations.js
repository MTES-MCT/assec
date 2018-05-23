export default `
type Mutation {
  createQuestion(
    order: Int!
    type: String!
    title: String!
    department: ID!
    display: String!
    description: String
  ): QuestionType

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
    name: String!
    order: String!
    department: ID!
    geojson: String!
    shortname: String!
    description: String
  ): ZoneType

  createSubscriber(
    email: String!
    department: ID!
    preferences: PreferencesInput
  ): SubscriberType

  createBlock(
    slug: String!
    label: String!
    content: String!
  ): BlockType

  updateBlock(
    id: ID!
    slug: String!
    label: String!
    content: String!
  ): BlockType

  updateZone(
    id: ID!
    name: String!
    order: String!
    shortname: String!
    description: String
    alerte: AlerteInput!
  ): ZoneType

  updateQuestion(
    id: ID!
    order: Int!
    type: String!
    title: String!
    display: String!
    description: String
  ): QuestionType

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

  deleteBlock(
    id: ID!
  ): BlockType

  deleteQuestion(
    id: ID!
  ): QuestionType

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
