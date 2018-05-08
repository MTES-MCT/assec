const scalars = `
  scalar Date
`;

const subscriber = `
type SubscriberType {
  id: ID!
  ctime: Date!
  mtime: Date!
  email: String!
  department: ID!
}
`;

const suos = `
type SUOType {
  id: ID!
  ctime: Date!
  mtime: Date!
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
  ctime: Date!
  mtime: Date!
  code: String!
  slug: String!
  name: String!
  label: String!
  usages: [SUOType]!
  origines: [SUOType]!
  situations: [SUOType]!
}
`;

const restriction = `
type RestrictionType {
  id: ID!
  ctime: Date!
  mtime: Date!
  label: String!
  department: ID!
  information: String
  description: String!
  usages: [ID]!
  origines: [ID]!
  situations: [ID]!
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
  ctime: Date!
  mtime: Date!
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
${scalars}
${suos}
${zone}
${hydrated}
${subscriber}
${restriction}
${departement}
`;

export default typeDefs;
