const queriesDefs = `
type Query {

  # SINGLES QUERIES
  # ###################################

  zone(id: ID): ZoneType
  block(id: ID): BlockType
  question(id: ID): QuestionType
  department(id: ID): DepartementType
  restriction(id: ID): RestrictionType

  # BULKS QUERIES
  # ###################################

  blocks: [BlockType]
  departments: [DepartementType]
  subscribers(department: ID): [SubscriberType]

  departmentSUOs(department: ID): SUOSType
  departmentZones(department: ID): [ZoneType]
  departmentSituations(department: ID): [SUOType]
  departmentQuestions(department: ID): [QuestionType]
  departmentRestrictions(department: ID): [RestrictionType]

  # ###################################
  #
  # FRONTEND QUERIES
  #
  # ###################################

  widget(code: String): WidgetType

  findRestriction(
    usages: ID!
    origines: ID!
    department: ID!
    situations: LatLngInput!
  ): RulesType
}
`;

export default queriesDefs;
