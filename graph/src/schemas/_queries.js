const queriesDefs = `
type Query {

  departmentSUOs(department: ID): SUOSType
  departmentZones(department: ID): [ZoneType]
  departmentRestrictions(department: ID): [RestrictionType]

  departments: [DepartementType]

  department(id: ID): DepartementType

  subscribers: [SubscriberType]

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
