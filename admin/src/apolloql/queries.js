import gql from 'graphql-tag';

export const ALL_DEPARTMENTS = gql(`
  query departments {
    departments {
      id
      code
      label
      suos {
        usages {
          id
          label
        }
        origines {
          id
          label
        }
        situations {
          id
          label
        }
      }
    }
  }
`);

export const DPT_ZONES = gql(`
query zones (
  $dpt: ID
) {
  zones (
    dpt: $dpt
  ) {
    id
    dpt
    label
    help
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

export const DPT_RESTRICTIONS = gql(`
query restrictions (
  $dpt: ID
) {
  restrictions (
    dpt: $dpt
  ) {
    id
    dpt
    slug
    title
    usages
    origines
    situations
    description
    information
  }
}
`);

export const SUOS = gql(`
query suos (
  $dpt: ID
) {
  suos (
    dpt: $dpt
  ) {
    usages {
      id
      label
    }
    origines {
      id
      label
    }
    situations {
      id
      label
    }
  }
}
`);

export const GET_DEPARTMENT = gql(`
query department (
  $id: ID!
) {
  department (
    id: $id
  ) {
    id
    code
    label
    suos {
      usages {
        id
        label
      }
      origines {
        id
        label
      }
      situations {
        id
        label
      }
    }
  }
}
`);

export const GET_RESTRICTION = gql(`
query restriction (
  $id: ID!
) {
  restriction (
    id: $id
  ) {
    id
    dpt
    title
    usages
    origines
    situations
    description
    information
  }
}
`);
