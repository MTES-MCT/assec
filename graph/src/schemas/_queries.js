const queriesDefs = `
type Query {

  # SINGLES QUERIES
  # ###################################

  zone(id: ID): ZoneType
  department(id: ID): DepartementType
  restriction(id: ID): RestrictionType

  # BULKS QUERIES
  # ###################################

  departments: [DepartementType]

  departmentSUOs(department: ID): SUOSType
  departmentZones(department: ID): [ZoneType]
  departmentSubscribers(department: ID): [SubscriberType]
  departmentRestrictions(department: ID): [RestrictionType]

  # ###################################
  #
  # FRONTEND QUERIES
  #
  # ###################################

  hydrateDepartment(department: ID): HydratedType

  findRestictionByCriteria(
    zones: ID
    usages: ID
    origines: ID
    department: ID
  ): [RestrictionType]
}
`;

export default queriesDefs;
