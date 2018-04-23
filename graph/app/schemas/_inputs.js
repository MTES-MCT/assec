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

input AlerteInput {
  situation: ID!
  end_date: String
  start_date: String
}

input ZoneInput {
  dpt: ID!
  help: String
  name: String!
  order: String!
  geojson: String
  alerte: [AlerteInput]
}

input DepartementInput {
  id: ID
  code: String
  name: String
  suos: SUOSInput
}
`;

export default inputsTypeDefs;
