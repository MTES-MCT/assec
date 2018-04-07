const entitiesTypeDefs = `
interface SUOS {
  id: String
  name: String
  slug: String
}

type Person {
  id: String
  email: String
  lastname: String
  firstname: String
}

type Departement {
  id: String
  suos: [SUOS]
  code: String
  name: String
  slug: String
}

type Restriction {
  id: String
  departement: String
  description: String
  informations: String
}
`;

export default entitiesTypeDefs;
