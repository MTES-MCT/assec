const scalars = `
  scalar Date
`;

const block = `
type BlockType {
  id: ID!
  ctime: Date!
  mtime: Date!
  slug: String!
  label: String!
  content: String!
}
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
  usages: [ID]!
  label: String!
  origines: [ID]!
  department: ID!
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

const widget = `
type QuestionType {
  id: ID!
  ctime: Date!
  mtime: Date!
  type: String!
  title: String!
  department: ID!
  description: String!
}

type WidgetType {
  zones: [ZoneType]!
  usages: [SUOType]!
  origines: [SUOType]!
  situations: [SUOType]!
  questions: [QuestionType]!
  restrictions: [RestrictionType]!
}
`;

const typeDefs = `
${scalars}
${suos}
${zone}
${block}
${widget}
${subscriber}
${restriction}
${departement}
`;

export default typeDefs;
