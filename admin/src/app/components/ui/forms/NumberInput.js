import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const NumberInput = ({
  label, inline, placeholder, name, ...rest
}) => (
  <p>
    <label htmlFor={name} className={inline ? 'inline' : ''}>
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
  inline: false,
  placeholder: '',
};

NumberInput.propTypes = {
  inline: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default NumberInput;
