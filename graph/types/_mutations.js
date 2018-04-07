const mutationsTypeDefs = `
type Mutation {
  createDepartment(
    suos: [SUOS]
    code: String
    name: String
  ): Department
}
`;

export default mutationsTypeDefs;
