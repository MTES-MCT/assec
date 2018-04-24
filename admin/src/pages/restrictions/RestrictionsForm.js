import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Query, Mutation } from 'react-apollo';

// application
import {
  GET_DEPARTMENT_SUOS,
  CREATE_RESTRICTION,
  UPDATE_DEPARTMENT_RESTRICTIONS,
} from './../../apolloql';
import { validatesuos } from './../../core/utils/suos';
import Legend from './../../components/forms/Legend';
import TextArea from './../../components/forms/TextArea';
import TextInput from './../../components/forms/TextInput';
import CheckboxGroup from './../../components/forms/CheckboxGroup';
import SubmitButton from './../../components/forms/SubmitButton';

const validator = (values) => {
  const errors = {};
  if (!values.label || values.label === '') {
    errors.label = 'Required';
  }
  if (!values.description || values.description === '') {
    errors.description = 'Required';
  }
  if (!values.suos || !validatesuos(values.suos)) {
    errors.suos = 'Required';
  }
  return errors;
};

const RestrictionsForm = ({ selected }) => (
  <Query query={GET_DEPARTMENT_SUOS} variables={{ id: selected }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const { departmenSUOs } = data;
      return (
        <Mutation mutation={CREATE_RESTRICTION}
          update={UPDATE_DEPARTMENT_RESTRICTIONS}>
          {(createRestriction, result) => (
            <Form validate={validator}
              initialValues={{ department: selected }}
              onSubmit={({ suos, ...base }, form) => {
                // FIXME -> ajouter l'action redux loading ici
                const variables = { ...base, ...suos };
                return createRestriction({ variables })
                  .then(() => form.reset())
                  .catch(() => {});
              }}
              render={({
                form, handleSubmit, pristine, invalid,
              }) => {
                const disabled =
                  result.loading || !(selected && selected !== null);
                const moredisabled =
                  pristine ||
                  result.loading ||
                  !form.label === '' ||
                  !(selected && selected !== null);
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
                      <TextArea disabled={moredisabled}
                        name="description"
                        label="Description de la restriction" />
                      <CheckboxGroup name="suos.situations"
                        display="inline"
                        label="Situation"
                        disabled={moredisabled}
                        provider={
                          (departmenSUOs && departmenSUOs.situations) || []
                        } />
                      <CheckboxGroup name="suos.usages"
                        label="Usage"
                        display="inline"
                        disabled={moredisabled}
                        provider={(departmenSUOs && departmenSUOs.usages) || []} />
                      <CheckboxGroup name="suos.origines"
                        label="Origine"
                        display="inline"
                        disabled={moredisabled}
                        provider={
                          (departmenSUOs && departmenSUOs.origines) || []
                        } />
                      <TextArea disabled={moredisabled}
                        name="information"
                        label="Plus d'informations pédagogiques"
                        large />
                      <SubmitButton pristine={pristine} invalid={invalid} />
                    </fieldset>
                  </form>
                );
              }} />
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
