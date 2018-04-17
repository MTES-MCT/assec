const queriesDefs = `
type Query {
  departements: [DepartementType]
  departmentSUOS(id: ID): SUOSType
  departement(id: ID!): DepartementType
  restrictions(dpt: ID!): [RestrictionType]
}
`;

export default queriesDefs;
