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
          disabled={disabled}
          push={formprops.mutators.unshift}
          placeholder="Ajouter une situation" />
        <ArrayValues name="usages"
          label="Usages"
          placeholder="Ajouter un usage"
          disabled={disabled}
          push={formprops.mutators.unshift} />
        <ArrayValues name="origines"
          label="Origines"
          disabled={disabled}
          push={formprops.mutators.unshift}
          placeholder="Ajouter une Origine" />
      </div>
    );
  }
}

DepartementPopin.propTypes = {
  disabled: PropTypes.bool.isRequired,
  formprops: PropTypes.object.isRequired,
};

export default withEditPopin(DepartementPopin, {
  validator,
  query: GET_DEPARTMENT,
  entityname: 'department',
  mutation: UPDATE_DEPARTMENT,
  suptitle: 'Modification du département',
});
