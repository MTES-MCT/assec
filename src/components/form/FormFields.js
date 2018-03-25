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
      fields,
      dispatch,
      activestep,
      handleSubmit,
      disabledsteps,
    } = this.props;
    const [field] = fields
      .filter((obj, index) => !disabledsteps.includes(index))
      .filter((obj, index) => index === activestep);
    const Instance = getinputbytype(field);
    return (
      <Form onSubmit={handleSubmit(() => {})}>
        <Instance {...field}
          key={`formfield_${field.id}`}
          onChange={() => {
            // si il s'agit du dernier champ de formulaire
            // on ne fait pas de verification
            if (field.index >= fields.length - 1) return;
            dispatch(checkConditions(field.index));
          }} />
      </Form>
    );
  }
}

FormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  activestep: PropTypes.number.isRequired,
  disabledsteps: PropTypes.array.isRequired,
  // connect redux
  dispatch: PropTypes.func.isRequired,
  // redux form injected props
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: FORM_NAME,
  initialValues: {},
})(FormFields);
