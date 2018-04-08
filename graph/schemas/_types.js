const suos = `
type SUOType {
  id: ID!
  name: String!
}

type SUOSType {
  usages: [SUOType]!
  origines: [SUOType]!
  situations: [SUOType]!
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

const typeDefs = `
${suos}
${departement}
`;

export default typeDefs;
