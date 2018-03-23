import React from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';

// application
import ListInput from './inputs/ListInput';
import { FORM_NAME } from './../../constants';
import ChoiceInput from './inputs/ChoiceInput';
import checkConditions from './../../actions/check-conditions';

const getinputbytype = (obj) => {
  switch (obj.type) {
  case 'list':
    return ListInput;
  case 'choice':
    return ChoiceInput;
  default:
    return null;
  }
};

class FormFields extends React.PureComponent {
  render () {
    const { fields, handleSubmit, dispatch } = this.props;
    return (
      <Form onSubmit={handleSubmit(() => {})}
        onChange={() => dispatch(checkConditions())}>
        {fields.map((obj, index) => {
          const Instance = getinputbytype(obj);
          return <Instance key={`formstep_${obj.id}`} {...obj} />;
        })}
      </Form>
    );
  }
}

FormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
  // redux form injected props
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: FORM_NAME,
  initialValues: {},
})(FormFields);
