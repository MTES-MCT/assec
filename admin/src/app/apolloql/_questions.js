import gql from 'graphql-tag';

import { GET_DEPARTMENT_QUESTIONS } from './queries';

export const CREATE_QUESTION = gql(`
mutation createQuestion(
  $type: String!
  $title: String!
  $department: ID!
  $description: String!
) {
  createQuestion(
    type: $type
    title: $title
    department: $department
    description: $description
  ) {
    id
    type
    title
    mtime
    ctime
    department
    description
  }
}
`);

export const UPDATE_QUESTION = gql(`
mutation updateQuestion (
  $id: ID!
  $type: String!
  $title: String!
  $description: String!
) {
  updateQuestion (
    id: $id
    type: $type
    title: $title
    description: $description
  ) {
    id
    type
    title
    mtime
    ctime
    department
    description
  }
}
`);

export const DELETE_QUESTION = gql(`
mutation deleteQuestion (
  $id: ID!
) {
  deleteQuestion (
    id: $id
  ) {
    id
    department
  }
}
`);

const getCurrentQuestions = (store, department) => {
  const data = store.readQuery({
    variables: { department },
    query: GET_DEPARTMENT_QUESTIONS,
  });
  return data.departmentQuestions;
};

export const UPDATE_DEPARTMENT_QUESTIONS = (store, { data }) => {
  let entries = [];
  let variables = {};
  if (data.createQuestion) {
    const { department } = data.createQuestion;
    const current = getCurrentQuestions(store, department);
    entries = current.concat([data.createQuestion]);
    variables = { department };
  }
  if (data.deleteQuestion) {
    const { department, id } = data.deleteQuestion;
    const current = getCurrentQuestions(store, department);
    entries = current.filter(obj => obj.id !== id);
    variables = { department };
  }
  store.writeQuery({
    variables,
    query: GET_DEPARTMENT_QUESTIONS,
    data: { departmentQuestions: entries },
  });
};
