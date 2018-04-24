import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Form, Field } from 'react-final-form';

// application
import { CREATE_ZONE, UPDATE_DEPARTMENT_ZONES } from './../../apolloql';
import Legend from './../../components/forms/Legend';
import TextArea from './../../components/forms/TextArea';
import TextInput from './../../components/forms/TextInput';
import NumberInput from './../../components/forms/NumberInput';
import SubmitButton from './../../components/forms/SubmitButton';

const validator = (values) => {
  const errors = {};
  if (!values.label || values.label === '') {
    errors.label = 'Required';
  }
  if (!values.geojson || values.geojson === '') {
    errors.geojson = 'Required';
  }
  return errors;
};

const initialValues = {
  help: '',
  order: 0,
  label: '',
  geojson: '',
};

const ZonesForm = ({ selected }) => (
  <Mutation mutation={CREATE_ZONE} update={UPDATE_DEPARTMENT_ZONES}>
    {(createZone, result) => (
      <Form validate={validator}
        initialValues={{ ...initialValues, department: selected }}
        onSubmit={(values, form) => {
          const variables = {
            ...values,
            order: values.order || '0',
          };
          return createZone({ variables })
            .then(() => form.reset())
            .catch(() => {});
        }}
        render={({
          form, invalid, pristine, handleSubmit,
        }) => {
          const disabled = result.loading || !(selected && selected !== null);
          return (
            <form onSubmit={handleSubmit} className="mb20">
              <fieldset>
                <Field name="department" type="hidden" component="input" />
                <Legend label="Ajouter une zone" />
                <TextInput disabled={disabled}
                  name="label"
                  label="Nom de la zone" />
                <NumberInput disabled={disabled}
                  name="order"
                  placeholder="Profondeur des calques"
                  label="Ordre d'affichage de la zone" />
                <TextArea disabled={disabled}
                  name="geojson"
                  label="Coordonnées de la zone" />
                <TextArea disabled={disabled}
                  name="help"
                  label="Texte d'information utilisateur" />
                <SubmitButton label="Ajouter"
                  invalid={invalid}
                  pristine={pristine} />
              </fieldset>
            </form>
          );
        }} />
    )}
  </Mutation>
);

ZonesForm.defaultProps = {
  selected: null,
};

ZonesForm.propTypes = {
  selected: PropTypes.string,
};

export default ZonesForm;
