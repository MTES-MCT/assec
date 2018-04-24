const queriesDefs = `
type Query {

  departmentSUOs(department: ID): SUOSType
  departmentZones(department: ID): [ZoneType]
  departmentRestrictions(department: ID): [RestrictionType]

  departments: [DepartementType]

  department(id: ID): DepartementType

  restriction(id: ID): RestrictionType


  hydrateDepartment(dpt: ID): HydratedType

  findRestictionByCriteria(
    dpt: ID
    zones: ID
    usages: ID
    origines: ID
  ): [RestrictionType]
}
`;

export default queriesDefs;
