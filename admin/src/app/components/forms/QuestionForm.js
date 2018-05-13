import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Form, Field } from 'react-final-form';

// application
import { CREATE_QUESTION, UPDATE_DEPARTMENT_QUESTIONS } from './../../apolloql';
import Legend from './../../components/ui/forms/Legend';
import TextInput from './../../components/ui/forms/TextInput';
import SelectBox from './../../components/ui/forms/SelectBox';
import RadioGroup from './../../components/ui/forms/RadioGroup';
import FormButtons from './../../components/ui/forms/FormButtons';
import NumberInput from './../../components/ui/forms/NumberInput';
import MarkdownInput from './../../components/ui/forms/MarkdownInput';
import { questions } from './../../components/forms/helpers/questions';

const QuestionForm = ({ selected }) => (
  <Mutation mutation={CREATE_QUESTION} update={UPDATE_DEPARTMENT_QUESTIONS}>
    {(createQuestion, result) => (
      <Form validate={questions.validator}
        decorators={[questions.calculator]}
        initialValues={{ ...questions.initialValues, department: selected }}
        render={({
          form, values, errors, invalid, pristine, handleSubmit,
        }) => {
          const disabled = invalid || pristine || result.loading;
          const isMapWithZoneType = values.type === 'zones';
          return (
            <form onSubmit={handleSubmit} className="mb20">
              <fieldset>
                <Legend label="Ajouter une question" />
                <Field name="department" type="hidden" component="input" />
                <TextInput name="title" label="Titre de la question" />
                <NumberInput disabled={disabled && errors.title}
                  name="order"
                  label="Ordre d'affichage de la question" />
                <RadioGroup inline
                  name="type"
                  provider={questions.provider.types}
                  disabled={disabled && errors.title}
                  label="Type des valeurs de la question" />
                <SelectBox inline
                  name="display"
                  label="Type d'affichage"
                  provider={questions.provider.displays}
                  disabled={
                    (disabled && (errors.title || errors.type)) ||
                    isMapWithZoneType
                  } />
                <MarkdownInput disabled={disabled}
                  name="description"
                  label="Description de la question" />
                <FormButtons disabled={disabled}
                  reset={() => form.reset(questions.initialValues)} />
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
