import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Query, Mutation } from 'react-apollo';

// application
import {
  CREATE_RESTRICTION,
  UPDATE_RESTRICTIONS,
  GET_DEPARTEMENT_SUOS,
} from './../../apolloql';
import Legend from './../../components/forms/Legend';
import TextArea from './../../components/forms/TextArea';
import TextInput from './../../components/forms/TextInput';
import CheckboxGroup from './../../components/forms/CheckboxGroup';
import SubmitButton from './../../components/forms/SubmitButton';

const validateSUOS = (suos) => {
  // vérifie que tous les champs validations
  // contiennent au moins une valeur
  const results = Object.keys(suos).filter(key => suos[key].length > 0);
  return results.length === 3;
};

const validator = (values) => {
  const errors = {};
  if (!values.title || values.title === '') {
    errors.title = 'Required';
  }
  if (!values.description || values.description === '') {
    errors.description = 'Required';
  }
  if (!values.suos || !validateSUOS(values.suos)) {
    errors.suos = 'Required';
  }
  return errors;
};

const RestrictionsForm = ({ selected }) => (
  <Query query={GET_DEPARTEMENT_SUOS} variables={{ id: selected }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const suos = data.departmentSUOS;
      return (
        <Mutation mutation={CREATE_RESTRICTION} update={UPDATE_RESTRICTIONS}>
          {(createRestriction, result) => (
            <Form validate={validator}
              initialValues={{ dpt: selected }}
              onSubmit={(
                { suos: { usages, origines, situations }, ...rest },
                form,
              ) => {
                const variables = {
                  usages,
                  origines,
                  situations,
                  ...rest,
                };
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
                  !form.title === '' ||
                  !(selected && selected !== null);
                return (
                  <form onSubmit={handleSubmit} className="mb40">
                    <span name="restriction-form-anchor" />
                    <fieldset>
                      <Legend label="Ajouter une restriction" />
                      <Field name="dpt" type="hidden" component="input" />
                      <TextInput disabled={disabled}
                        name="title"
                        label="Titre de la restriction" />
                      <TextArea disabled={moredisabled}
                        name="description"
                        label="Description de la restriction" />
                      <CheckboxGroup name="suos.situations"
                        display="inline"
                        label="Situation"
                        disabled={moredisabled}
                        provider={(suos && suos.situations) || []} />
                      <CheckboxGroup name="suos.usages"
                        label="Usage"
                        display="inline"
                        disabled={moredisabled}
                        provider={(suos && suos.usages) || []} />
                      <CheckboxGroup name="suos.origines"
                        label="Origine"
                        display="inline"
                        disabled={moredisabled}
                        provider={(suos && suos.origines) || []} />
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
