const queriesDefs = `
type Query {
  departements: [DepartementType]
  departmentSUOS(id: ID): SUOSType
  departement(id: ID!): DepartementType
}
`;

export default queriesDefs;
