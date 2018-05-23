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

input LatLngInput {
  lat: Float
  lng: Float
}

input SituationInput {
  id: ID!
  label: String!
}

input PreferencesInput {
  usages: ID!
  latlng: ID!
  origines: LatLngInput!
}

input AlerteInput {
  end_date: String
  start_date: String
  situation: SituationInput!
}
`;

export default inputsTypeDefs;
