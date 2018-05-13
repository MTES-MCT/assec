import gql from 'graphql-tag';

/* ----------------------------------------

 BULKS

---------------------------------------- */

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

export const GET_ALL_BLOCKS = gql(`
  query blocks {
    blocks {
      id
      slug
      label
      content
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
    description
    name
    mtime
    ctime
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

export const GET_DEPARTMENT_QUESTIONS = gql(`
query departmentQuestions (
  $department: ID!
) {
  departmentQuestions (
    department: $department
  ) {
    id
    type
    order
    title
    mtime
    ctime
    display
    department
    description
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
    department
    description
    information
    usages
    origines
    situations
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

export const GET_DEPARTMENT_SITUATIONS = gql(`
query departmentSituations (
  $department: ID!
) {
  departmentSituations (
    department: $department
  ) {
    id
    label
  }
}
`);

export const GET_DEPARTMENT_SUBSCRIBERS = gql(`
query departmentSubscribers (
  $department: ID!
) {
  departmentSubscribers (
    department: $department
  ) {
    id
    email
  }
}
`);

/* ----------------------------------------

 SINGLES

---------------------------------------- */

export const GET_DEPARTMENT = gql(`
query department (
  $id: ID!
) {
  department (
    id: $id
  ) {
    id
    code
    name
    label
    mtime
    ctime
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

export const GET_BLOCK = gql(`
query block (
  $id: ID!
) {
  block (
    id: $id
  ) {
    id
    slug
    label
    mtime
    ctime
    content
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
    label
    mtime
    ctime
    department
    description
    information
    usages
    origines
    situations
  }
}
`);

export const GET_ZONE = gql(`
query zone (
  $id: ID!
) {
  zone (
    id: $id
  ) {
    id
    description
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

export const GET_QUESTION = gql(`
query question (
  $id: ID!
) {
  question (
    id: $id
  ) {
    id
    type
    order
    title
    mtime
    ctime
    display
    department
    description
  }
}
`);
