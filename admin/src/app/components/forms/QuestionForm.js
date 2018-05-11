import React from 'react';
import { Form } from 'react-final-form';
import { Mutation } from 'react-apollo';

// application
import { CREATE_QUESTION, UPDATE_DEPARTMENT_QUESTIONS } from './../../apolloql';
import Legend from './../../components/ui/forms/Legend';
import TextInput from './../../components/ui/forms/TextInput';
import SelectBox from './../../components/ui/forms/SelectBox';
import SubmitButton from './../../components/ui/forms/SubmitButton';
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
  if (!values.description || values.description === '') {
    errors.description = 'Required';
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

const QuestionForm = () => (
  <Mutation mutation={CREATE_QUESTION} update={UPDATE_DEPARTMENT_QUESTIONS}>
    {(createQuestion, result) => (
      <Form validate={validator}
        initialValues={initialValues}
        render={({
          form, invalid, pristine, handleSubmit,
        }) => {
          const disabled = result.loading;
          return (
            <form onSubmit={handleSubmit} className="mb20">
              <fieldset>
                <Legend label="Ajouter une question" />
                <SelectBox name="type"
                  provider={typeProvider}
                  label="Type de la question" />
                <TextInput disabled={disabled}
                  name="title"
                  autoComplete="off"
                  label="Titre de la question" />
                <MarkdownInput disabled={disabled}
                  name="content"
                  label="Description de la question" />
                <SubmitButton label="Ajouter"
                  invalid={invalid || result.loading}
                  pristine={pristine || result.loading} />
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

export default QuestionForm;
