const suos = `
interface SUOS {
  id: String
  name: String
  slug: String
}
`;

// const person = `
// type Person {
//   id: String
//   email: String
//   lastname: String
//   firstname: String
// }
// `;

const department = `
type Department {
  id: String
  suos: [SUOS]
  code: String
  name: String
  slug: String
}
`;

// const restriction = `
// type Restriction {
//   id: String
//   departement: String
//   description: String
//   informations: String
// }
// `;

const entitiesTypeDefs = `
${suos}
${department}
`;

export default entitiesTypeDefs;
