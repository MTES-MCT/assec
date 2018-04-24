const queriesDefs = `
type Query {
  zones(dpt: ID): [ZoneType]
  departments: [DepartementType]
  departmenSUOs(id: ID): SUOSType
  department(id: ID): DepartementType
  restriction(id: ID): RestrictionType
  restrictions(id: ID): [RestrictionType]
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
