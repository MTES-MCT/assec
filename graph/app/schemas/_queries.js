const queriesDefs = `
type Query {
  suos(dpt: ID): SUOSType
  departments: [DepartementType]
  department(id: ID): DepartementType
  restriction(id: ID): RestrictionType
  restrictions(dpt: ID): [RestrictionType]
}
`;

export default queriesDefs;
