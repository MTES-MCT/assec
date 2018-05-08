import React from 'react';
import PropTypes from 'prop-types';

// application
import { GET_DEPARTMENT, UPDATE_DEPARTMENT } from './../../apolloql';
import ArrayValues from './../ui/forms/ArrayValues';
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

class DepartementPopin extends React.PureComponent {
  render () {
    const { disabled, formprops } = this.props;
    return (
      <div className="flex-columns flex-between">
        <ArrayValues name="situations"
          label="Situations"
          push={formprops.mutators.unshift}
          placeholder="Ajouter une situation"
          disabled={disabled} />
        <ArrayValues name="usages"
          label="Usages"
          push={formprops.mutators.unshift}
          placeholder="Ajouter un usage"
          disabled={disabled} />
        <ArrayValues name="origines"
          label="Origines"
          push={formprops.mutators.unshift}
          placeholder="Ajouter une Origine"
          disabled={disabled} />
      </div>
    );
  }
}

DepartementPopin.propTypes = {
  disabled: PropTypes.bool.isRequired,
  formprops: PropTypes.object.isRequired,
};

export default withEditPopin(DepartementPopin, {
  query: GET_DEPARTMENT,
  mutation: UPDATE_DEPARTMENT,
  validator,
  entityname: 'department',
  suptitle: 'Modification du département',
});
