import gql from 'graphql-tag';

export const ALL_DEPARTMENTS = gql(`
  query departments {
    departments {
      id
      code
      label
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

export const GET_DEPARTMENT_ZONES = gql(`
query zones (
  $department: ID!
) {
  zones (
    department: $department
  ) {
    id
    label
    help
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

export const GET_DEPARTMENT_RESTRICTIONS = gql(`
query restrictions (
  # FIXME -> changer le id par department
  $id: ID!
) {
  restrictions (
    # FIXME -> changer le id par department
    id: $id
  ) {
    id
    label
    usages
    origines
    department
    situations
    description
    information
  }
}
`);

export const GET_DEPARTMENT_SUOS = gql(`
query departmenSUOs (
  $id: ID!
) {
  departmenSUOs (
    id: $id
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
