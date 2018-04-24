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
`;

export default inputsTypeDefs;
