const inputsTypeDefs = `
input SUOInput {
  id: ID
  name: String!
}

input SUOSInput {
  usages: [SUOInput]
  origines: [SUOInput]
  situations: [SUOInput]
}

input ZoneInput {
  name: String
  help: String
  situation: ID
  geojson: String
  department: ID!
}

input DepartementInput {
  id: ID
  code: String
  name: String
  suos: SUOSInput
}
`;

export default inputsTypeDefs;
