import gql from 'graphql-tag';

import { DPT_ZONES } from './queries';

export const CREATE_ZONE = gql(`
mutation createZone(
  $dpt: ID!
  $help: String
  $name: String!
  $order: String!
  $geojson: String!
) {
  createZone(
    dpt: $dpt
    name: $name
    help: $help
    order: $order
    geojson: $geojson
  ) {
    id
    dpt
    help
    label
    order
    alerte
    geojson
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
    dpt
    help
    name
    order
    geojson
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
    dpt
  }
}
`);

const getCurrentZones = (store, dpt) => {
  const data = store.readQuery({
    variables: { dpt },
    query: DPT_ZONES,
  });
  return data.zones;
};

export const UPDATE_DPT_ZONES = (store, { data }) => {
  let entries = [];
  let variables = {};
  if (data.createZone) {
    const { dpt } = data.createZone;
    const zones = getCurrentZones(store, dpt);
    entries = zones.concat([data.createZone]);
    variables = { dpt };
  }
  if (data.updateZoneAlerte) {
    const { id, dpt, alerte } = data.updateZoneAlerte;
    const zones = getCurrentZones(store, dpt);
    entries = zones.map(obj => (obj.id !== id ? obj : Object.assign({}, obj, { alerte })));
    variables = { dpt };
  }
  if (data.deleteZone) {
    const { dpt, id } = data.deleteZone;
    const zones = getCurrentZones(store, dpt);
    entries = zones.filter(obj => obj.id !== id);
    variables = { dpt };
  }
  store.writeQuery({
    variables,
    query: DPT_ZONES,
    data: { zones: entries },
  });
};
