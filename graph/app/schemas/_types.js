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
  usages: [SUOType]!
  origines: [SUOType]!
  situations: [SUOType]!
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

const typeDefs = `
${suos}
${restriction}
${departement}
`;

export default typeDefs;
