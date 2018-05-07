import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const NumberInput = ({
  label, placeholder, name, ...rest
}) => (
  <p>
    <label htmlFor={name}>
      <span>{label}</span>
      <Field {...rest}
        type="number"
        id={name}
        name={name}
        maxLength="3"
        component="input"
        placeholder={placeholder} />
    </label>
  </p>
);

NumberInput.defaultProps = {
  placeholder: '',
};

NumberInput.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default NumberInput;
