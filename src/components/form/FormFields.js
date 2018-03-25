import React from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';

// application
import { FORM_NAME } from './../../constants';
import ListInput from './inputs/ListInput';
import ChoiceInput from './inputs/ChoiceInput';
import ZoningInput from './inputs/ZoningInput';

const getinputbytype = (obj) => {
  switch (obj.type) {
  case 'list':
    return ListInput;
  case 'choice':
    return ChoiceInput;
  case 'zoning':
    return ZoningInput;
  default:
    return null;
  }
};

class FormFields extends React.PureComponent {
  render () {
    const {
      fields,
      onSubmit,
      activestep,
      onConditions,
      handleSubmit,
      disabledsteps,
    } = this.props;
    const [field] = fields
      .filter((obj, index) => !disabledsteps.includes(index))
      .filter((obj, index) => index === activestep);
    const Instance = getinputbytype(field);
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Instance {...field}
          key={`formfield_${field.id}`}
          onChange={() => onConditions(field.index)} />
      </Form>
    );
  }
}

FormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  activestep: PropTypes.number.isRequired,
  disabledsteps: PropTypes.array.isRequired,
  // form screen callback
  onSubmit: PropTypes.func.isRequired,
  onConditions: PropTypes.func.isRequired,
  // redux form injected props
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: FORM_NAME,
  initialValues: {},
})(FormFields);
