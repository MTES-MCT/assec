const queriesTypeDefs = `
type Query {
  allDepartments: [Department]
  getDepartmentSUO(department: String): [SUOS]
}
`;

export default queriesTypeDefs;
