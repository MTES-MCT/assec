import React from 'react';

// application
import { GET_ZONE, UPDATE_ZONE } from './../../apolloql';
import TextInput from './../ui/forms/TextInput';
import NumberInput from './../ui/forms/NumberInput';
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

const ZonePopin = () => (
  <div className="flex-rows">
    <NumberInput inline name="order" label="Ordre d'affichage de la zone" />
    <TextInput inline name="shortname" label="Nom court de la zone" />
    <TextInput inline name="name" label="Nom long de la zone" />
  </div>
);

export default withEditPopin(ZonePopin, {
  validator,
  query: GET_ZONE,
  entityname: 'zone',
  mutation: UPDATE_ZONE,
  suptitle: "Modification d'une zone",
});
