const subscriber = `
type SubscriberType {
  id: ID!
  email: String!
}
`;

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
  name: String!
  label: String!
  order: String!
  department: ID!
  geojson: String!
  shortname: String!
  alerte: AlerteType
}
`;

const hydrated = `
type HydratedType {
  zones: [ZoneType]!
  usages: [SUOType]!
  origines: [SUOType]!
  situations: [SUOType]!
  restrictions: [RestrictionType]!
}
`;

const typeDefs = `
${suos}
${zone}
${hydrated}
${subscriber}
${restriction}
${departement}
`;

export default typeDefs;
