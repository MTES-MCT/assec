import React from 'react';

// application
import { GET_ZONE, UPDATE_ZONE } from './../../apolloql';
import withEditPopin from './../ui/popins/withEditPopin';

const validator = (values) => {
  const errors = {};
  if (!values.code || values.code === '') {
    errors.code = 'Required';
  }
  if (!values.label || values.label === '') {
    errors.label = 'Required';
  }
  return errors;
};

const ZonePopin = () => <div className="flex-columns flex-between" />;

ZonePopin.propTypes = {
  // form: PropTypes.object.isRequired,
  // disabled: PropTypes.bool.isRequired,
};

export default withEditPopin(ZonePopin, {
  query: GET_ZONE,
  mutation: UPDATE_ZONE,
  validator,
  entityname: 'zone',
  suptitle: 'Modification de la zone',
});
