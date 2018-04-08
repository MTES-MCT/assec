const queriesDefs = `
type Query {
  departements: [DepartementType]
  departement(id: ID!): DepartementType
}
`;

export default queriesDefs;
