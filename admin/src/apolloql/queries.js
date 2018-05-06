import gql from 'graphql-tag';

export const GET_ALL_DEPARTMENTS = gql(`
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
query departmentZones (
  $department: ID!
) {
  departmentZones (
    department: $department
  ) {
    id
    help
    label
    name
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

export const GET_DEPARTMENT_RESTRICTIONS = gql(`
query departmentRestrictions (
  $department: ID!
) {
  departmentRestrictions (
    department: $department
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
query departmentSUOs (
  $department: ID!
) {
  departmentSUOs (
    department: $department
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
    title
    usages
    origines
    department
    situations
    description
    information
  }
}
`);

export const GET_ALL_SUBSCRIBERS = gql(`
  query subscribers {
    subscribers {
      id
      email
    }
  }
`);
