const queriesTypeDefs = `
type Query {
  allPersons: [Person]
  allRestrictions: [Restriction]
  allDepartements: [Departement]
  getDepartementSUO(departement: String): [SUOS]
  allDepartementRestrictions(departement: String): [Restriction]
}
`;

export default queriesTypeDefs;
