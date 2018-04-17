mutation createDepartement(
  $code: String!
  $name: String!
  $suos: SUOSInput!
) {
  createDepartement(
    code: $code
    name: $name
    suos: $suos
  ) {
    id
    suos {
      usages {
        id
        name
      }
      origines {
        id
        name
      }
      situations {
        id
        name
      }
    }
  }
}

mutation updateDepartement(
  $id: ID!
  $name: String
  $code: String
  $suos: SUOSInput
) {
  updateDepartement (
  	id: $id
  	name: $name
  	code: $code
  	suos: $suos
	) {
    id
    code
    name
    slug
    suos {
      usages {
      	name
    	}
    }
  }
}

query departements {
  departements {
    id
    code
    name
    slug
    suos {
      usages {
        id
        name
      }
      origines {
        id
        name
      }
      situations {
        id
        name
      }
    }
  }
}

query departement (
  $id: ID!
) {
  departement (
    id: $id
  ) {
    id
    name
  }
}

mutation deleteDepartment (
  $id: ID!
) {
  deleteDepartment (
    id: $id
  )
}

query departmentSUOS (
  $id: ID!
) {
  departmentSUOS (
    id: $id
  ) {
    usages {
      id
      name
    }
    origines {
      id
      name
    }
    situations {
      id
      name
    }
  }
}

mutation createRestriction(
  $dpt: ID!
  $title: String!
  $usages: [String]!
  $origines: [String]!
  $description: String!
  $situations: [String]!
  $information: String
) {
  createRestriction(
    dpt: $dpt
    title: $title
    usages: $usages
    origines: $origines
    description: $description
    situations: $situations
  	information: $information
  ) {
    id
  }
}
