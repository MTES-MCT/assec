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

class SituationPopin extends React.PureComponent {
  render () {
    const { disabled, form } = this.props;
    return (
      <div className="flex-columns flex-between">
        <ArrayValues name="situations"
          label="Situations"
          push={form.mutators.unshift}
          placeholder="Ajouter une situation"
          disabled={disabled} />
        <ArrayValues name="usages"
          label="Usages"
          push={form.mutators.unshift}
          placeholder="Ajouter un usage"
          disabled={disabled} />
        <ArrayValues name="origines"
          label="Origines"
          push={form.mutators.unshift}
          placeholder="Ajouter une Origine"
          disabled={disabled} />
      </div>
    );
  }
}

SituationPopin.propTypes = {
  form: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default withEditPopin(SituationPopin, {
  query: GET_DEPARTMENT,
  mutation: UPDATE_DEPARTMENT,
  validator,
  entityname: 'department',
  suptitle: 'Gestion du département',
});
