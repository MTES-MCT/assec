const inputsTypeDefs = `
input SUOInput {
  id: ID
  label: String!
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
  label: String!
  order: String!
  geojson: String
  alerte: [AlerteInput]
}

input DepartementInput {
  id: ID
  code: String!
  label: String!
  usages: [SUOInput]!
  origines: [SUOInput]!
  situations: [SUOInput]!
}
`;

export default inputsTypeDefs;
