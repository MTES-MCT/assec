const suos = `
type SUOType {
  id: ID!
  name: String!
}

type SUOSType {
  usages: [SUOType]
  origines: [SUOType]
  situations: [SUOType]
}
`;

const departement = `
type DepartementType {
  id: ID!
  code: String!
  name: String!
  slug: String!
  suos: SUOSType!
}
`;

const restriction = `
type RestrictionType {
  id: ID!
  dpt: ID!
  slug: String!
  title: String!
  usages: [String]!
  origines: [String]!
  description: String!
  situations: [String]!
  information: String
}
`;

const zone = `
type AlerteType {
  situation: ID
  end_date: String
  start_date: String
}

type ZoneType {
  id: ID!
  dpt: ID!
  help: String
  name: String!
  order: String!
  geojson: String!
  alerte: AlerteType
}
`;

const typeDefs = `
${suos}
${zone}
${restriction}
${departement}
`;

export default typeDefs;
