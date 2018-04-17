const queriesDefs = `
type Query {
  suos(dpt: ID): SUOSType
  departements: [DepartementType]
  departement(id: ID): DepartementType
  restrictions(dpt: ID): [RestrictionType]
}
`;

export default queriesDefs;
