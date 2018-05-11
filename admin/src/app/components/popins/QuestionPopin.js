import React from 'react';

// application
import { GET_QUESTION, UPDATE_QUESTION } from './../../apolloql';
import TextInput from './../ui/forms/TextInput';
import SelectBox from './../ui/forms/SelectBox';
import MarkdownInput from './../ui/forms/MarkdownInput';
import withEditPopin from './../ui/popins/withEditPopin';

const validator = (values) => {
  const errors = {};
  if (!values.type || values.type === '') {
    errors.type = 'Required';
  }
  if (!values.title || values.title === '') {
    errors.title = 'Required';
  }
  if (!values.description || values.description === '') {
    errors.description = 'Required';
  }
  return errors;
};

const typeProvider = [
  {
    id: 'zoning',
    label: 'Zones',
  },
  {
    id: 'choice',
    label: 'Usages',
  },
  {
    id: 'list',
    label: 'Origines',
  },
];

const QuestionPopin = () => (
  <div className="flex-rows">
    <SelectBox name="type"
      provider={typeProvider}
      label="Type de la question" />
    <TextInput inline name="title" label="Titre de la question block" />
    <MarkdownInput inline
      name="description"
      className="py12"
      label="Description de la question" />
  </div>
);

export default withEditPopin(QuestionPopin, {
  validator,
  query: GET_QUESTION,
  entityname: 'question',
  mutation: UPDATE_QUESTION,
  suptitle: "Modification d'un Block CMS",
});
