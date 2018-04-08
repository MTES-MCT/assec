const inputsTypeDefs = `
input SUOInput {
  name: String!
}

input SUOSInput {
  usages: [SUOInput]
  origines: [SUOInput]
  situations: [SUOInput]
}

input DepartementInput {
  code: String
  name: String
  suos: SUOSInput
}
`;

export default inputsTypeDefs;
