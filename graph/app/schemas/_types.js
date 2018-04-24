const suos = `
type SUOType {
  id: ID!
  label: String!
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
  slug: String!
  label: String!
  suos: SUOSType!
}
`;

const restriction = `
type RestrictionType {
  id: ID!
  dpt: ID!
  slug: String!
  label: String!
  usages: [ID]!
  origines: [ID]!
  situations: [ID]!
  description: String!
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
  label: String!
  order: String!
  geojson: String!
  alerte: AlerteType
}
`;

const hydrated = `
  type HydratedType {
    usages: [SUOType]!
    zones: [ZoneType]!
    origines: [SUOType]!
    situations: [SUOType]!
    restrictions: [RestrictionType]!
  }
`;

const typeDefs = `
${suos}
${zone}
${hydrated}
${restriction}
${departement}
`;

export default typeDefs;
