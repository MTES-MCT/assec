const queriesDefs = `
type Query {
  departments: [DepartementType]
  department(id: ID): DepartementType

  departmentSUOs(department: ID): SUOSType
  departmentZones(department: ID): [ZoneType]
  departmentSubscribers(department: ID): [SubscriberType]
  departmentRestrictions(department: ID): [RestrictionType]

  restriction(id: ID): RestrictionType

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
