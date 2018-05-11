import gql from 'graphql-tag';

import { GET_DEPARTMENT_ZONES } from './queries';

export const CREATE_ZONE = gql(`
mutation createZone(
  $help: String
  $name: String!
  $order: String!
  $department: ID!
  $geojson: String!
  $shortname: String!
) {
  createZone(
    help: $help
    name: $name
    order: $order
    geojson: $geojson
    shortname: $shortname
    department: $department
  ) {
    id
    help
    name
    label
    order
    geojson
    shortname
    department
    alerte {
      end_date
      start_date
      situation {
        id
        label
      }
    }
  }
}
`);

export const UPDATE_ZONE = gql(`
mutation updateZone (
  $id: ID!
  $help: String!
  $name: String!
  $order: String!
  $shortname: String!
  $alerte: AlerteInput!
) {
  updateZone (
    id: $id
    name: $name
    help: $help
    order: $order
    alerte: $alerte
    shortname: $shortname
  ) {
    id
    help
    name
    label
    order
    mtime
    ctime
    geojson
    shortname
    department
    alerte {
      end_date
      start_date
      situation {
        id
        label
      }
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
    const current = getCurrentZones(store, department);
    entries = current.concat([data.createZone]);
    variables = { department };
  }
  if (data.deleteZone) {
    const { department, id } = data.deleteZone;
    const current = getCurrentZones(store, department);
    entries = current.filter(obj => obj.id !== id);
    variables = { department };
  }
  store.writeQuery({
    variables,
    query: GET_DEPARTMENT_ZONES,
    data: { departmentZones: entries },
  });
};
