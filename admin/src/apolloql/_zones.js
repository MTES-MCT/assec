import gql from 'graphql-tag';

import { GET_DEPARTMENT_ZONES } from './queries';

export const CREATE_ZONE = gql(`
mutation createZone(
  $help: String
  $label: String!
  $order: String!
  $department: ID!
  $geojson: String!
) {
  createZone(
    help: $help
    label: $label
    order: $order
    geojson: $geojson
    department: $department
  ) {
    id
    help
    label
    order
    geojson
    department
    alerte {
      end_date
      situation
      start_date
    }
  }
}
`);

export const UPDATE_ZONE_ALERTE = gql(`
mutation updateZoneAlerte (
  $id: ID!
  $alerte: AlerteInput!
) {
  updateZoneAlerte (
    id: $id
    alerte: $alerte
  ) {
    id
    help
    name
    order
    geojson
    department
    alerte {
      end_date
      start_date
      situation
    }
  }
}
`);

export const DELETE_ZONE = gql(`
mutation deleteZone (
  $id: ID!
) {
  deleteZone (
    id: $id
  ) {
    id
    department
  }
}
`);

const getCurrentZones = (store, department) => {
  const data = store.readQuery({
    variables: { department },
    query: GET_DEPARTMENT_ZONES,
  });
  return data.departmentZones;
};

export const UPDATE_DEPARTMENT_ZONES = (store, { data }) => {
  let entries = [];
  let variables = {};
  if (data.createZone) {
    const { department } = data.createZone;
    const zones = getCurrentZones(store, department);
    entries = zones.concat([data.createZone]);
    variables = { department };
  }
  if (data.updateZoneAlerte) {
    const { id, department, alerte } = data.updateZoneAlerte;
    const zones = getCurrentZones(store, department);
    entries = zones.map(obj => (obj.id !== id ? obj : Object.assign({}, obj, { alerte })));
    variables = { department };
  }
  if (data.deleteZone) {
    const { department, id } = data.deleteZone;
    const zones = getCurrentZones(store, department);
    entries = zones.filter(obj => obj.id !== id);
    variables = { department };
  }
  store.writeQuery({
    variables,
    query: GET_DEPARTMENT_ZONES,
    data: { departmentZones: entries },
  });
};
