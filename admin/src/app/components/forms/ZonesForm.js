import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Form, Field } from 'react-final-form';

// application
import { CREATE_ZONE, UPDATE_DEPARTMENT_ZONES } from './../../apolloql';
import Legend from './../../components/ui/forms/Legend';
import TextArea from './../../components/ui/forms/TextArea';
import TextInput from './../../components/ui/forms/TextInput';
import NumberInput from './../../components/ui/forms/NumberInput';
import FormButtons from './../../components/ui/forms/FormButtons';
import MarkdownInput from './../../components/ui/forms/MarkdownInput';

const validator = (values) => {
  const errors = {};
  if (!values.name || values.name === '') {
    errors.name = 'Required';
  }
  if (!values.shortname || values.shortname === '') {
    errors.shortname = 'Required';
  }
  if (!values.geojson || values.geojson === '') {
    errors.geojson = 'Required';
  }
  return errors;
};

const initialValues = {
  name: '',
  order: 0,
  geojson: '',
  shortname: '',
  description: '',
};

const ZonesForm = ({ selected }) => (
  <Mutation mutation={CREATE_ZONE} update={UPDATE_DEPARTMENT_ZONES}>
    {(createZone, result) => (
      <Form validate={validator}
        initialValues={{ ...initialValues, department: selected }}
        render={({
          form, invalid, pristine, handleSubmit,
        }) => {
          const disabled = result.loading || !(selected && selected !== null);
          const moredisabled =
            pristine ||
            result.loading ||
            !form.name === '' ||
            !form.shortname === '' ||
            !(selected && selected !== null);
          const sdisabled = invalid || pristine || result.loading;
          return (
            <form onSubmit={handleSubmit} className="mb20">
              <fieldset>
                <Field name="department" type="hidden" component="input" />
                <Legend label="Ajouter une zone" />
                <TextInput disabled={disabled}
                  name="name"
                  label="Nom long de la zone" />
                <TextInput disabled={disabled}
                  name="shortname"
                  label="Nom court de la zone" />
                <TextArea large
                  name="geojson"
                  disabled={moredisabled}
                  label="Coordonnées de la zone" />
                <NumberInput disabled={moredisabled}
                  name="order"
                  placeholder="Profondeur des calques"
                  label="Ordre d'affichage de la zone" />
                <MarkdownInput disabled={moredisabled}
                  name="description"
                  label="Texte d'information utilisateur" />
                <FormButtons disabled={sdisabled}
                  reset={() => form.reset(initialValues)} />
              </fieldset>
            </form>
          );
        }}
        onSubmit={(values, form) => {
          const variables = {
            ...values,
            order: values.order || '0',
          };
          return createZone({ variables })
            .then(() => form.reset())
            .catch(() => {});
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
