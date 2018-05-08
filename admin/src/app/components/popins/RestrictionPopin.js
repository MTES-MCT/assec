import React from 'react';

// application
import { GET_RESTRICTION, UPDATE_RESTRICTION } from './../../apolloql';
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

const RestrictionPopin = () => <div className="flex-columns flex-between" />;

RestrictionPopin.propTypes = {
  // form: PropTypes.object.isRequired,
  // disabled: PropTypes.bool.isRequired,
};

export default withEditPopin(RestrictionPopin, {
  query: GET_RESTRICTION,
  mutation: UPDATE_RESTRICTION,
  validator,
  entityname: 'restriction',
  suptitle: 'Modification de la restriction',
});
