const queriesDefs = `
type Query {
  suos(dpt: ID): SUOSType
  zones(dpt: ID): [ZoneType]
  departments: [DepartementType]
  department(id: ID): DepartementType
  restriction(id: ID): RestrictionType
  restrictions(dpt: ID): [RestrictionType]
}
`;

export default queriesDefs;
