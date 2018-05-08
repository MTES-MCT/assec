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

export const UPDATE_ZONE_ALERTE = gql(`
mutation updateZoneAlerte (
  $id: ID!
  $situationid: ID!
) {
  updateZoneAlerte (
    id: $id
    situationid: $situationid
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
mutation zone (
  $id: ID!
) {
  zone (
    id: $id
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
  if (data.updateZoneAlerte) {
    const { id, department, alerte } = data.updateZoneAlerte;
    const current = getCurrentZones(store, department);
    entries = current.map(obj => (obj.id !== id ? obj : Object.assign({}, obj, { alerte })));
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
