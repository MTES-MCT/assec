import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Field } from 'react-final-form';

// application
import {
  GET_ZONE,
  UPDATE_ZONE,
  GET_DEPARTMENT_SITUATIONS,
} from './../../apolloql';
import TextInput from './../ui/forms/TextInput';
import RadioGroup from './../ui/forms/RadioGroup';
import NumberInput from './../ui/forms/NumberInput';
import MarkdownInput from './../ui/forms/MarkdownInput';
import withEditPopin from './../ui/popins/withEditPopin';

const validator = (values) => {
  const errors = {};
  if (!values.name || values.name === '') {
    errors.name = 'Required';
  }
  if (!values.shortname || values.shortname === '') {
    errors.shortname = 'Required';
  }
  return errors;
};

const ZonePopin = ({ formprops: { values } }) => {
  const { department } = values;
  return (
    <Query query={GET_DEPARTMENT_SITUATIONS} variables={{ department }}>
      {({ data, loading }) => (
        <div className="flex-rows">
          <Field type="hidden" component="input" name="department" />
          <NumberInput inline
            name="order"
            label="Ordre d'affichage de la zone" />
          <TextInput inline name="shortname" label="Nom court de la zone" />
          <TextInput inline name="name" label="Nom long de la zone" />
          <RadioGroup display="inline"
            disabled={loading}
            name="alerte.situation.id"
            label="Selectionnez une situation"
            provider={(data && data.departmentSituations) || []} />
          <MarkdownInput name="help" label="Texte d'information utilisateur" />
        </div>
      )}
    </Query>
  );
};

ZonePopin.propTypes = {
  formprops: PropTypes.object.isRequired,
};

export default withEditPopin(ZonePopin, {
  validator,
  query: GET_ZONE,
  entityname: 'zone',
  mutation: UPDATE_ZONE,
  suptitle: "Modification d'une zone",
});
