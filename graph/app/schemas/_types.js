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
  usages: [SUOType]!
  origines: [SUOType]!
  situations: [SUOType]!
}
`;

const restriction = `
type RestrictionType {
  id: ID!
  usages: [ID]!
  label: String!
  department: ID!
  origines: [ID]!
  situations: [ID]!
  information: String
  description: String!
}
`;

const zone = `
type SituationType {
  id: ID
  label: String
}

type AlerteType {
  end_date: String
  start_date: String
  situation: SituationType
}

type ZoneType {
  id: ID!
  help: String
  label: String!
  order: String!
  department: ID!
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
