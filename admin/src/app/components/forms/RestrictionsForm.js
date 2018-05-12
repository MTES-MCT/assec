import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Query, Mutation } from 'react-apollo';

// application
import {
  CREATE_RESTRICTION,
  GET_DEPARTMENT_SUOS,
  UPDATE_DEPARTMENT_RESTRICTIONS,
} from './../../apolloql';
import Legend from './../../components/ui/forms/Legend';
import TextInput from './../../components/ui/forms/TextInput';
import FormButtons from './../../components/ui/forms/FormButtons';
import MarkdownInput from './../../components/ui/forms/MarkdownInput';
import CheckboxGroup from './../../components/ui/forms/CheckboxGroup';

const validator = (values) => {
  const errors = {};
  if (!values.label || values.label === '') {
    errors.label = 'Required';
  }
  if (!values.description || values.description === '') {
    errors.description = 'Required';
  }
  if (!values.usages || values.usages.length <= 0) {
    errors.usages = 'Required';
  }
  if (!values.origines || values.origines.length <= 0) {
    errors.origines = 'Required';
  }
  if (!values.situations || values.situations.length <= 0) {
    errors.situations = 'Required';
  }
  return errors;
};

const RestrictionsForm = ({ selected }) => (
  <Query query={GET_DEPARTMENT_SUOS} variables={{ department: selected }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const {
        departmentSUOs: { situations, usages, origines },
      } = data;
      return (
        <Mutation mutation={CREATE_RESTRICTION}
          update={UPDATE_DEPARTMENT_RESTRICTIONS}>
          {(createRestriction, result) => (
            <Form validate={validator}
              initialValues={{ department: selected }}
              render={({
                form, values, handleSubmit, pristine, invalid,
              }) => {
                const disabled =
                  result.loading || !(selected && selected !== null);
                const ddisabled =
                  pristine ||
                  disabled ||
                  !values.label ||
                  values.label.trim() === '';
                const cdisabled =
                  ddisabled ||
                  !values.description ||
                  values.description.trim() === '';
                return (
                  <form onSubmit={handleSubmit} className="mb40">
                    <span name="restriction-form-anchor" />
                    <fieldset>
                      <Legend label="Ajouter une restriction" />
                      <Field name="department"
                        type="hidden"
                        component="input" />
                      <TextInput disabled={disabled}
                        name="label"
                        label="Titre de la restriction" />
                      <MarkdownInput disabled={ddisabled}
                        name="description"
                        label="Description de la restriction" />
                      <CheckboxGroup name="situations"
                        display="inline"
                        label="Situation"
                        disabled={cdisabled}
                        provider={situations || []} />
                      <CheckboxGroup name="usages"
                        label="Usage"
                        display="inline"
                        disabled={cdisabled}
                        provider={usages || []} />
                      <CheckboxGroup name="origines"
                        label="Origine"
                        display="inline"
                        disabled={cdisabled}
                        provider={origines || []} />
                      <MarkdownInput disabled={cdisabled}
                        name="information"
                        label="Plus d'informations pédagogiques" />
                      <FormButtons reset={form.reset}
                        disabled={invalid || pristine || result.loading} />
                    </fieldset>
                  </form>
                );
              }}
              onSubmit={(variables, form) =>
                createRestriction({ variables })
                  .then(() => form.reset())
                  .catch(() => {})
              } />
          )}
        </Mutation>
      );
    }}
  </Query>
);

RestrictionsForm.defaultProps = {
  selected: null,
};

RestrictionsForm.propTypes = {
  selected: PropTypes.string,
};

export default RestrictionsForm;
