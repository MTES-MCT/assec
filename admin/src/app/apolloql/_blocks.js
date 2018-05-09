import gql from 'graphql-tag';

import { GET_ALL_BLOCKS } from './queries';

export const CREATE_BLOCK = gql(`
mutation createBlock(
  $slug: String!
  $label: String!
  $content: String!
) {
  createBlock(
    slug: $slug
    label: $label
    content: $content
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

export const UPDATE_BLOCK = gql(`
mutation updateBlock (
  $id: ID!
  $slug: String!
  $label: String!
  $content: String!
) {
  updateBlock (
    id: $id
    slug: $slug
    label: $label
    content: $content
  ) {
    id
    slug
    label
    content
  }
}
`);

export const DELETE_BLOCK = gql(`
mutation deleteBlock (
  $id: ID!
) {
  deleteBlock (
    id: $id
  ) {
    id
  }
}
`);

const getCurrentBlocks = (store) => {
  const data = store.readQuery({
    query: GET_ALL_BLOCKS,
  });
  return data.blocks;
};

export const UPDATE_ALL_BLOCKS = (store, { data }) => {
  let entries = [];
  const variables = {};
  if (data.createBlock) {
    const current = getCurrentBlocks(store);
    entries = current.concat([data.createBlock]);
  }
  if (data.deleteBlock) {
    const current = getCurrentBlocks(store);
    entries = current.filter(({ id }) => id !== data.deleteBlock.id);
  }
  store.writeQuery({
    variables,
    query: GET_ALL_BLOCKS,
    data: { blocks: entries },
  });
};
