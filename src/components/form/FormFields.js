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
    const {
      fields, disabled, dispatch, handleSubmit,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(() => {})}>
        {fields.map((obj, index) => {
          if (disabled.includes(index)) return null;
          const key = `formfield_${obj.id}`;
          const Instance = getinputbytype(obj);
          return (
            <Instance {...obj}
              key={key}
              fieldindex={index}
              onChange={() => {
                if (index >= fields.length - 1) return;
                dispatch(checkConditions(index));
              }} />
          );
        })}
      </Form>
    );
  }
}

FormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
  disabled: PropTypes.array.isRequired,
  // redux form injected props
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: FORM_NAME,
  initialValues: {},
})(FormFields);
