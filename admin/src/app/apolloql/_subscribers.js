import gql from 'graphql-tag';

import { GET_DEPARTMENT_SUBSCRIBERS } from './queries';

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

export const DELETE_SUBSCRIBER = gql(`
mutation deleteSubscriber (
  $id: ID!
) {
  deleteSubscriber (
    id: $id
  ) {
    id
    department
  }
}
`);

const getCurrentSubscribers = (store, department) => {
  const data = store.readQuery({
    variables: { department },
    query: GET_DEPARTMENT_SUBSCRIBERS,
  });
  return data.departmentSubscribers;
};

export const UPDATE_DEPARTMENT_SUBSCRIBERS = (store, { data }) => {
  let entries = [];
  let variables = {};
  if (data.deleteSubscriber) {
    const { department, id } = data.deleteSubscriber;
    const current = getCurrentSubscribers(store, department);
    entries = current.filter(obj => obj.id !== id);
    variables = { department };
  }
  store.writeQuery({
    variables,
    query: GET_DEPARTMENT_SUBSCRIBERS,
    data: { departmentSubscribers: entries },
  });
};
