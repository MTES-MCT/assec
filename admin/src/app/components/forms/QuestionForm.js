import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Form, Field } from 'react-final-form';

// application
import { CREATE_QUESTION, UPDATE_DEPARTMENT_QUESTIONS } from './../../apolloql';
import Legend from './../../components/ui/forms/Legend';
import TextInput from './../../components/ui/forms/TextInput';
import SelectBox from './../../components/ui/forms/SelectBox';
import FormButtons from './../../components/ui/forms/FormButtons';
import MarkdownInput from './../../components/ui/forms/MarkdownInput';

const validator = (values) => {
  // valide que les valeurs du formulaire
  // sont OK avec ce que l'on attend
  const errors = {};
  if (!values.type || values.type === '') {
    errors.type = 'Required';
  }
  if (!values.title || values.title === '') {
    errors.title = 'Required';
  }
  return errors;
};

const initialValues = {
  type: '',
  title: '',
  description: '',
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

const QuestionForm = ({ selected }) => (
  <Mutation mutation={CREATE_QUESTION} update={UPDATE_DEPARTMENT_QUESTIONS}>
    {(createQuestion, result) => (
      <Form validate={validator}
        initialValues={{ ...initialValues, department: selected }}
        render={({
          form, invalid, pristine, handleSubmit,
        }) => {
          const disabled = result.loading;
          return (
            <form onSubmit={handleSubmit} className="mb20">
              <fieldset>
                <Legend label="Ajouter une question" />
                <Field name="department" type="hidden" component="input" />
                <SelectBox disabled={disabled}
                  name="type"
                  provider={typeProvider}
                  label="Type de la question" />
                <TextInput disabled={disabled}
                  name="title"
                  autoComplete="off"
                  label="Titre de la question" />
                <MarkdownInput disabled={disabled}
                  name="description"
                  label="Description de la question" />
                <FormButtons reset={form.reset}
                  disabled={invalid || pristine || result.loading} />
              </fieldset>
            </form>
          );
        }}
        onSubmit={(variables, form) =>
          createQuestion({ variables })
            .then(() => form.reset())
            .catch(() => {})
        } />
    )}
  </Mutation>
);

QuestionForm.defaultProps = {
  selected: null,
};

QuestionForm.propTypes = {
  selected: PropTypes.string,
};

export default QuestionForm;
